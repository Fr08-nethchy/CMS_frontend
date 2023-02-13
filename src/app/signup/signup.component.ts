import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import {SnackbarService} from '../service/snackbar.service';
import {NgxUiLoaderModule, NgxUiLoaderService} from 'ngx-ui-loader';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {GlobalConstants} from '../shared/global-constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  password : boolean =true;

  confirmPassword :boolean = true;

  signupForm:any=FormGroup;

  responseMessage:any;

  constructor(
              private fb:FormBuilder,
              private userService:UserService,
              private  snackbar:SnackbarService,
              private loader:NgxUiLoaderService,
              private router:Router,
              private dialogRef:MatDialogRef<SignupComponent>) { }

  ngOnInit(): void {
    this.signupForm=this.fb.group({
      name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailegex)]],
      contactNumber:[null,[Validators.required,Validators.pattern(GlobalConstants.catactRegex)]],
      password:[null,[Validators.required]],
      confirmPassword:[null,[Validators.required]],
    })
  }

  valideSubmit() {
   return this.signupForm.controls['password'].value != this.signupForm.controls['confirmPassword'].value;
  }

  handleSubmit(){
    this.loader.start();
    var formData=this.signupForm.value;
    var data={
      name:formData.name,
      email:formData.email,
      contactNumber:formData.contactNumber,
      password:formData.password
    }
    this.userService.signUp(data).subscribe((response:any)=>{
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
