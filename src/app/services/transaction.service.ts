import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from '../Models/Users/User';
import { Observable, BehaviorSubject } from  'rxjs';
import { Agence } from '../Models/Agence/Agence';
import { Profils } from '../Models/Profil/Profil';
@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  loggedIn:boolean=false; // est ce que y a quelqu un qui s est connecté 
  connectedUser:User|any;
  baseUrl = "http://127.0.0.1:8000/api"
  jwt: string|any;
  roles: Array<string>|any;
  constructor(public http: HttpClient,public router: Router) { }

  registerTans(Trans:any) {

    const formData: FormData = new FormData();
    formData.append('montantEnvoyer', Trans.montant);
    formData.append('nomEnvoyeur', Trans.nomE);
    formData.append('prenomEnvoyeur', Trans.prenomE);
    formData.append('telEnvoyeur', Trans.telE);
    formData.append('cinEnvoyeur', Trans.cinE);
    formData.append('nomBeneficiaire', Trans.nomB);
    formData.append('prenomBeneficiaire', Trans.prenomB);
    formData.append('telBeneficiaire', Trans.telB);
    

    console.log(formData);
    
    return this.http.post(this.baseUrl+ "/envoyer/argent",formData);
  
      
  }

  retirerTans(Trans:any){
    const formData: FormData = new FormData();
    formData.append('codeTransaction', Trans.codeTransaction);
    formData.append('cinBeneficiaire', Trans.cinB);
    return this.http.post(this.baseUrl+ "/retirer/argent",formData);

  }

  TrouverCode(code:any){
    const formData: FormData = new FormData();
    formData.append('codeTransaction', code.codeTransaction);
    console.log(code.codeTransaction);
    
    return this.http.post(this.baseUrl+ "/TrouverCode",formData);
  }

}
