import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { from, Observable } from 'rxjs';
import { Storage } from  '@ionic/storage';
import { AuthentificationService } from '../services/authentification.service';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(

    private autha : AuthentificationService,
    private storage :Storage ,private router:Router ){}
    canActivate(
    ): Observable<any > {


     return from(this.storage.get('token')).pipe(

      map((token) => {
       if(token){
         this.router.navigateByUrl('/agence')
         
       }
       else {
         return true;
       }
      }) 

      
     )
    }
}
