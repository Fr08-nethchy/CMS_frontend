import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ConfirmationComponent} from '../../../confirmation/confirmation.component';
import {ChangePasswordComponent} from '../../../change-password/change-password.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  role: any;

  constructor(private router: Router,
              private dialog: MatDialog) {

  }

  logout() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px"
    dialogConfig.data = {
      message: 'Logout'
    };
    const dialogRef=this.dialog.open(ConfirmationComponent,dialogConfig);

    // @ts-ignore
    const sub=dialogRef.componentInstance.onEmitStatusChange.subscribe((user)=>{
      dialogRef.close();
      localStorage.clear();
      this.router.navigate(['/'])
    })
  }

  changePassword() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px"

    this.dialog.open(ChangePasswordComponent,dialogConfig)
  }
}
