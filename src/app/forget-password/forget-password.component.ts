import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import {SnackbarService} from '../service/snackbar.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {GlobalConstants} from '../shared/global-constants';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  responseMessage:any;
  constructor(
    private fb:FormBuilder,
    private userService:UserService,
    private  snackbar:SnackbarService,
    private loader:NgxUiLoaderService,
    private router:Router,
    private dialogRef:MatDialogRef<ForgetPasswordComponent>) { }

  forgetPasswordForm:any=FormGroup;
  ngOnInit(): void {
    this.forgetPasswordForm=this.fb.group({
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailegex)]]

    })
  }


  handleSubmit(){
    this.loader.start();
    var formData=this.forgetPasswordForm.value;
    var data={email:formData.email}
    this.userService.forgetPassword(data).subscribe((response:any)=>{
      this.loader.stop();
      this.dialogRef.close();
      this.responseMessage=response?.message;
      this.snackbar.openSnackBar(this.responseMessage,"");
      this.router.navigate(['/'])
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
