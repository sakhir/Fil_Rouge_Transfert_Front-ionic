import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
const helper = new JwtHelperService();
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(public mnctrl :MenuController,private authService: AuthService) { }

  ngOnInit() {
  }

// la fonction de deconnexion 
OnLogout() {
  this.authService.logOut();
  
 }
 // je dois recuperer l id de l utilisateur qui s est connecté 
 GetInfosUserConnecte() {
  const decoded :any= helper.decodeToken(this.authService.getToken());
 return decoded;
}

// je vais creer une fonction qui permet de recuperer le role

getRole(){
  return localStorage.getItem('role');
}

}
