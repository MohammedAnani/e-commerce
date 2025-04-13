import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/base';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

_HttpClient=inject(HttpClient);
_Router=inject(Router);

// token
decodeToken:any=null;
saveUserData(){

  this.decodeToken=jwtDecode(localStorage.getItem('tokenUser')!)

}

setRegisterForm(data:object):Observable<any>
{
return this._HttpClient.post(`${environment.baseUrl}api/v1/auth/signup`,data)
}

setLoginForm(data:object):Observable<any>
{
  return this._HttpClient.post(`${environment.baseUrl}api/v1/auth/signin`,data)
}

logOut(){
  localStorage.removeItem('tokenUser')
  this.decodeToken=null;
  this._Router.navigate(['/login'])
}

setEmailVerify(data:object):Observable<any>
{
  return this._HttpClient.post(`${environment.baseUrl}api/v1/auth/forgotPasswords`,data)
}

setCodeVerify(data:object):Observable<any>
{
  return this._HttpClient.post(`${environment.baseUrl}api/v1/auth/verifyResetCode`,data)
}
setRestPass(data:object):Observable<any>
{
  return this._HttpClient.put(`${environment.baseUrl}api/v1/auth/resetPassword`,data)
}


}
