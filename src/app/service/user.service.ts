import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn : 'root'
})

export class UserService{

  url: string = environment.appUrl;
  constructor(private http: HttpClient) {}

  signUp(data:any){
    return this.http.post(this.url+"/user/signup",data, {headers:new HttpHeaders().set("content-Type","application/json")});
  }

  forgetPassword(data:any){
    return this.http.post(this.url+"/user/forgetPassword",data, {headers:new HttpHeaders().set("content-Type","application/json")});
  }

  login(data:any){
    return this.http.post(this.url+"/user/login",data, {headers:new HttpHeaders().set("content-Type","application/json")});
  }


  checkToken(){
    return this.http.get(this.url+"/user/checkToken");
  }

  changePassword(data:any){
    return this.http.post(this.url+"/user/changePassword",data,{
      headers:new HttpHeaders().set('Content-Type','application/json')
    });
  }
}
