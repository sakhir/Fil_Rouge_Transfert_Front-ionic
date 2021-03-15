import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  // fonction qui vérifie si un utilisateur est connecté 
  isLogin(){  
    return   this.authService.isLogin();
  }
}
