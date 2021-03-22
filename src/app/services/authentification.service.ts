import { Injectable } from  '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Platform } from '@ionic/angular';
import { map, switchMap } from  'rxjs/operators';
import { Observable, BehaviorSubject, from, of } from  'rxjs';
import { Storage } from  '@ionic/storage';

import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
const helper = new JwtHelperService();
const TOKEN_KEY = 'token';
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  baseUrl:  string  =  'http://127.0.0.1:8000/api';
  public user: Observable<any>;
  userInfo = new BehaviorSubject(null);
  jwtHelper = new JwtHelperService();
  checkUserObs:Observable<any>;
  constructor(private  httpClient:  HttpClient, private readonly storage:  Storage ,private readonly platform:Platform ,private  router: Router) { 
    //this.loadUserInfo();
  }
  loadUserInfo() {
    let readyPlatformObs = from(this.platform.ready());
 
    this.checkUserObs = readyPlatformObs.pipe(
      switchMap(() => {
          return from(this.getAccessToken());
      }),
      map((token) => {
        if(!token){
        
          
          return null;
        }
          var decodedUser = this.jwtHelper.decodeToken(token);
          this.userInfo.next(decodedUser);
          return true;
      }));
    
  }
  


  login(email,password) :Observable<any>  {
    
    return this.httpClient.post(`${this.baseUrl}/login_check`, {email,password});
  }

  
  
  isLoggedIn() {
    return this.userInfo.asObservable();
  }
  Logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.router.navigateByUrl('/login');
      this.userInfo.next(null);
    });
  }

  logout(){
    this.storage.clear().then(()=>{
      this.router.navigateByUrl('/login'); 
      this.userInfo.next(null);
    })
  }
  getUser() {
    return this.userInfo.asObservable();
  }
  getAccessToken(){
    return this.storage.get(TOKEN_KEY);
  }


  SaveInfosToken(token:string ) {
    var decoded = helper.decodeToken(token);
    //console.log(decoded);
    this.storage.set('token',token);
    this.storage.set('roles',decoded['roles']);
    this.storage.set('currentUser', decoded['username']);
    return decoded;

  }

   getInfosToken(token:string){
    var decoded = helper.decodeToken(token);
      return decoded;
   }

}
