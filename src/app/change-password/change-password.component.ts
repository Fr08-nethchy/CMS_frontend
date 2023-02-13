import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import {MatDialogRef} from '@angular/material/dialog';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {SnackbarService} from '../service/snackbar.service';
import {GlobalConstants} from '../shared/global-constants';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  hide:boolean=true;
  changePasswordForm:any=FormGroup;
  responseMessage:any;
  constructor(private  fb:FormBuilder,
              private userService:UserService,
              private dialogRef:MatDialogRef<ChangePasswordComponent>,
              private  ngxService:NgxUiLoaderService,
              private snackBar:SnackbarService) { }

  ngOnInit(): void {
    this.changePasswordForm=this.fb.group({
      oldPassword:[null,[Validators.required]],
      newPassword:[null,[Validators.required]],
      confirmPassword:[null,[Validators.required]]
    })
  }
  validateSubmit(){
    if (this.changePasswordForm.controls['newPassword'].value !=this.changePasswordForm.controls['confirmPassword'].value){
      return true;
    }else{
      return false;
    }
  }
  handleChangePassword(){
    this.ngxService.start();
    var formData=this.changePasswordForm.value;
    var data = {
      oldPassword:formData.oldPassword,
      newPassword:formData.newPassword,
      confirmPassword:formData.confirmPassword
    }
    this.userService.changePassword(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.responseMessage=response?.message;
      this.dialogRef.close();
      this.snackBar.openSnackBar(this.responseMessage,'success');
    },error => {
      console.log(error);
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage=error.error?.message;
      }else{
        this.responseMessage=GlobalConstants.genericError;
      }
      this.snackBar.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }
}
