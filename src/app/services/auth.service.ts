import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from '../Models/Users/User';
import { Observable, BehaviorSubject } from  'rxjs';
import { Agence } from '../Models/Agence/Agence';
import { Profils } from '../Models/Profil/Profil';
import { Storage } from  '@ionic/storage';
import { NavController } from '@ionic/angular';


export const TOKEN_NAME: string = 'token';
@Injectable({
  providedIn: 'root'
})export class AuthService {
  loggedIn:boolean=false; // est ce que y a quelqu un qui s est connecté 
  connectedUser:User|any;
  baseUrl = "http://127.0.0.1:8000/api"
  jwt: string|any;
  roles: Array<string>|any;
 

  constructor(public http: HttpClient,public router: Router ,private navctrl: NavController ,private  storage:  Storage) { }
  
  registerUser(User:any) {

    const formData: FormData = new FormData();
    formData.append('password', User.password);
    User.nom=User.nom.toUpperCase()
    formData.append('nom', User.nom);
    User.prenom=(User.prenom.charAt(0).toUpperCase() + User.prenom.substring(1).toLowerCase());
    formData.append('prenom', User.prenom);
    User.email=User.email.toLowerCase();
    formData.append('email', User.email);
    formData.append('password', User.password);
    formData.append('adresse', User.adresse);
    formData.append('avatar', User.imageName);
    formData.append('telephone', User.telephone);
   // console.log(User.avatar);
    formData.append('profil', User.profil);
    formData.append('agence', User.agence);

    console.log(formData);
    
    return this.http.post(this.baseUrl+ "/create/user",formData);
  
      
  }

  getAgences(){
    return this.http.get<Agence[]>(this.baseUrl+ "/all/partenaires?statut=0");
   
  }

  getOneUser(id:any){
    return this.http.get<User[]>(this.baseUrl+ "/user/"+id);
  }

  getUsers(){
    return this.http.get<User[]>(this.baseUrl+ "/all/users?isdeleted=0");
  }
  allProfils(){
    //Une fonction qui recupére tous les profils 
  
      return this.http.get<Profils[]>(this.baseUrl+ "/admin/profils?archivage=0");
    }
  
  getToken(): any {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem("token", token);
    this.jwt = token;
  }


  //fonction de connexion
  login(email: string,password: string){
    return this.http.post(this.baseUrl+ "/login_check",{
       email,password
    })
  }
  
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    this.jwt = undefined;
    this.roles = undefined;
    this.loggedIn=false;
    this.navctrl.navigateRoot("/login")
  }
  // On va creer la fonction isLOgin qui permet de savoir si un utilisateur est connecté ou  non
  isLogin() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  // Fonction qui permet de voir si in token donné est autorisé ou non 
  getAuthorizationToken() {
    const currentUser = JSON.stringify(localStorage.getItem('token'));
   // console.log(currentUser);
    return currentUser;
  }

  allUsers(){
  //Une fonction qui recupére tous les utilisateurs 

    return this.http.get<User[]>(this.baseUrl+ "/admin/users");
  }

  GetUserBYId(id:any){
    //Une fonction qui recupére tous les utilisateurs 
      return this.http.get<User[]>(this.baseUrl+ "/admin/users/"+id);
    }

    DeleteUser(id:any){
      return this.http.delete<string>(this.baseUrl+ "/supprimer/user/"+id);
    }
    BloquerUser(id:any){
      return this.http.delete<string>(this.baseUrl+ "/bloquer/user/"+id);
    }


    isSuperAdmin() {

      return localStorage.getItem("roles").indexOf("ROLE_Super-Admin") >= 0;
    }
  
    isCaissier() {
  
      return localStorage.getItem("roles").indexOf("ROLE_Caissier") >= 0;
    }
  
    isPartenaire() {
  
      return localStorage.getItem("roles").indexOf("ROLE_Partenaire") >= 0;
    }
  
    isAdminSystem() {
      return localStorage.getItem("roles").indexOf("ROLE_System") >= 0;
    }
  
    isUser() {
      return localStorage.getItem("roles").indexOf("ROLE_Utilisateur") >= 0;
    }
  
    isAdminPartenaire() {
  
      return localStorage.getItem("roles").indexOf("ROLE_Admin-Partenaire") >= 0;
    }
}
