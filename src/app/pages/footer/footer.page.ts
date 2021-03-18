import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";
const helper = new JwtHelperService();
@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
})
export class FooterPage implements OnInit {

  constructor(private auth :AuthService ) { }

  ngOnInit() {
  }
 // je dois recuperer l id de l utilisateur qui s est connecté 
 GetInfosUserConnecte() {
  const decoded :any= helper.decodeToken(this.auth.getToken());
 return decoded;
}

// je vais creer une fonction qui permet de recuperer le role

getRole(){
  return this.GetInfosUserConnecte().roles[0];
}

}
