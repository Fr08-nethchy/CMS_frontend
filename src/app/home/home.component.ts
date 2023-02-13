import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SignupComponent} from '../signup/signup.component';
import {ForgetPasswordComponent} from '../forget-password/forget-password.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import {SnackbarService} from '../service/snackbar.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Router} from '@angular/router';
import {GlobalConstants} from '../shared/global-constants';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private dialog:MatDialog,
    private fb:FormBuilder,
    private userService:UserService,
    private  snackbar:SnackbarService,
    private loader:NgxUiLoaderService,
    private router:Router,
    ) { }
   hide=true;
  loginForm:any=FormGroup;
  responseMessage:any
  ngOnInit(): void {

    this.userService.checkToken().subscribe((response:any)=>{
      this.router.navigate(['cms/dashboard'])
    },(error:any) => {
     console.log(error);
    })
    this.loginForm=this.fb.group({
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailegex)]],
      password:[null,[Validators.required]]

    })
  }

  handleSignUpdaAction() {
    this.dialog.open(SignupComponent);
  }

  handleForgetPasswordAction() {
    this.dialog.open(ForgetPasswordComponent);
  }

  handleSubmit(){
    this.loader.start();
    var formData=this.loginForm.value;
    var data={email:formData.email,password:formData.password}
    this.userService.login(data).subscribe((response:any)=>{
      this.loader.stop();
      localStorage.setItem("token",response.token);
      this.router.navigate(['/cms/dashboard'])
    },(error) => {
      this.loader.stop();
      if(error.error?.message){
        this.responseMessage=error.error?.message;
      }else{
        this.responseMessage=GlobalConstants.genericError;
      }
      this.snackbar.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }
}
