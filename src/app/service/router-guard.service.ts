import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {SnackbarService} from './snackbar.service';
import {GlobalConstants} from '../shared/global-constants';

import jwt_decode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class RouterGuardService {


  constructor(private auth:AuthService,
              private router:Router,
              private snackBar:SnackbarService) { }

  canActivate(route:ActivatedRouteSnapshot):boolean{
    let expectedRoleArray= route.data;
    console.log("Url Data:",route.data)
    expectedRoleArray=expectedRoleArray.expectedRole;
    const token:any=localStorage.getItem('token');
    var tokenPayload :any;

    try {
      tokenPayload=jwt_decode(token)
      console.table("tokenPayload:",tokenPayload)
    }catch (e) {
      localStorage.clear();
      this.router.navigate(['/']);
    }
    let checkRole=false;
    for (let i=0;i<expectedRoleArray.length;i++){
      if(expectedRoleArray[i]==tokenPayload.role){
        checkRole=true;
      }
    }
    if (tokenPayload.role=='user' || tokenPayload.role=='admin'){
      if(this.auth.isAuthenticated() && checkRole){
        return true;
      }
      this.snackBar.openSnackBar(GlobalConstants.unAuthorized,GlobalConstants.error);
      this.router.navigate(['/cms/dashboard']);
      return false;
    }else{
      localStorage.clear();
      this.router.navigate(['/']);
      return false;
    }
  }
}
