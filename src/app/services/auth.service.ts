import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import {Observable, catchError, map,of,tap} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  private _user:any = null
  private baseUrl = environment.baseUrl

  get user(){
    return this._user
  }

  constructor(private httpClient:HttpClient) {}
  login(data:any){

    return this.httpClient.post<any>(`${this.baseUrl}/auth/login`,data)
    .pipe(
      tap((res)=>{
        if (res.ok === true) {
          this._user = {
            id:res.id,
            username:res.username,
            token:res.token
          }
          this.isLoggedIn = true;
        }else{
          this._user= null
        }
      }),
      map((res)=>res.ok),
      catchError((err)=> of(err.error.msg))
    )
  }

  register(data:any){
    return this.httpClient.post<any>(`${this.baseUrl}/auth/register`,data)
    .pipe(
      tap((res)=>{
        if (res.ok === true) {
          this._user = {
            id:res.id,
            username:res.username,
            token:res.token
          }
        }else{
          this._user= null
        }
      }),
      map((res)=>res.ok),
      catchError((err)=> of(err.error.msg))
    )
  }

  validarToken():Observable<boolean>{
    const token = JSON.parse(localStorage.getItem("user")!)
    if(token){
      return new Observable((subscriber)=>{
        subscriber.next(true)
      })
    }else{
      return new Observable((subscriber)=>{
        subscriber.next(false)
      })
    }
  }
}
