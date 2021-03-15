import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConnexionGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private _route:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean> |  boolean  {
      // if (this.auth.isLogin()) { //verifie si le token existe!
      //   return true;
      // } else {
      //  this._route.navigateByUrl('login')
      //   return false;
      // }
      return true;
  }
  
}
