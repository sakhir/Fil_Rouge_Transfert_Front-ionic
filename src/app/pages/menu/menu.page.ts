import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MenuController } from '@ionic/angular';
import { Storage } from  '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
const helper = new JwtHelperService();
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  role:any;
  constructor(public mnctrl :MenuController,private autha:AuthentificationService ,private  ActivatedRoute:ActivatedRoute , private storage :Storage) { }

  ngOnInit() {
    this.ActivatedRoute.params.subscribe(()=>{
      this.storage.get('token').then(token=> {
        //console.log(this.autha.getInfosToken(token));
        var decoded=this.autha.getInfosToken(token);
         if(decoded){
            this.role=decoded.roles[0];
                 }
         }
       
      )
  })
  }

// la fonction de deconnexion 
OnLogout() {
  this.autha.logout();
  
 }
 // je dois recuperer l id de l utilisateur qui s est connecté 
 
// je vais creer une fonction qui permet de recuperer le role

getRole(){
  return this.role;
}

}
