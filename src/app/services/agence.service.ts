import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from '../Models/Users/User';
import { Observable, BehaviorSubject } from  'rxjs';
import { Agence } from '../Models/Agence/Agence';
import { Profils } from '../Models/Profil/Profil';

export const TOKEN_NAME: string = 'token';

@Injectable({
  providedIn: 'root'
})
export class AgenceService {
  connectedUser:User|any;
  baseUrl = "http://127.0.0.1:8000/api"
  jwt: string|any;
  roles: Array<string>|any;
  constructor(public http: HttpClient,public router: Router) { }

  registerAgence(Agence:Agence) {
    
    return this.http.post(this.baseUrl+ "/partenaire/create",Agence);
  
  }

  getComptes(){
    return this.http.get<Agence[]>(this.baseUrl+ "/all/comptes");
  }
  TrouverTarif(montant) {
    
    return this.http.post(this.baseUrl+ "/Trouvertarif",montant);  
      
  }

  DeposerArgent(c:any) {
    return this.http.post(this.baseUrl+ "/faire/depot",c);  
  }
}
