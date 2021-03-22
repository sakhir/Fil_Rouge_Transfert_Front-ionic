import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ActivatedRoute } from '@angular/router';
import { Storage } from  '@ionic/storage';
import { AuthentificationService } from 'src/app/services/authentification.service';
const helper = new JwtHelperService();
@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
})
export class FooterPage implements OnInit {
 role:any;
  constructor(private autha :AuthentificationService ,private  ActivatedRoute:ActivatedRoute , private storage :Storage) { }

  ngOnInit() {
    
    this.ActivatedRoute.params.subscribe(()=>{
      this.storage.get('token').then(token=> {
        var decoded=this.autha.getInfosToken(token);    
         if(decoded){
            this.role=decoded.roles[0];
                 }
         }
       
      )
  })
  }


// je vais creer une fonction qui permet de recuperer le role

getRole(){
  return this.role;
}

}
