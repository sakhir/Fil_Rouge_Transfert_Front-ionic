import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { from, Observable } from 'rxjs';
import { Storage } from  '@ionic/storage';
import { AuthentificationService } from '../services/authentification.service';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ConnexionGuard implements CanActivate {
  constructor(

    private autha : AuthentificationService,
    private storage :Storage){}
    canActivate(
    ): Observable<boolean > {


     return from(this.storage.get('token')).pipe(

      map((token) => {
       if(token){
          return true;
       }
       else {
         this.autha.logout();
       }
      }) 

      
     )
    }
}
