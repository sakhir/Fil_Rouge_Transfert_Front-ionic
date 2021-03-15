import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

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

}
