import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { paseUrl } from '../../env/enviroments';
import { jwtDecode } from "jwt-decode";
import {  Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private httpClient:HttpClient,private router:Router) { }
  userdate:any;

  sendregisterdata(data:object):Observable<any>{
    return this.httpClient.post(`${paseUrl.pase_Url}users/signUp`,data)
  }
  sendlogindata(data:object):Observable<any>{
    return this.httpClient.post(`${paseUrl.pase_Url}users/signIn`,data)
  }
  savedatetoken():void{
    const token =localStorage.getItem('token')! ;
    this.userdate = jwtDecode(token);
    console.log(this.userdate );
  }
  SignOut():void{
localStorage.removeItem('token');
this.userdate=null;
this.router.navigate(['/login'])
  }
}
