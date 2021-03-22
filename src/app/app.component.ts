import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AuthentificationService } from './services/authentification.service';
import { Storage } from  '@ionic/storage';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  test:boolean=false;
  constructor(private autha :AuthentificationService ,private  ActivatedRoute:ActivatedRoute , private storage :Storage) { 
   
  }

  ngOnInit() {
    this.ActivatedRoute.params.subscribe(()=>{

      //this.menuCtrl.enable(false);
      this.storage.get('token').then(token=> {
        //console.log(this.autha.getInfosToken(token));
        var decoded=this.autha.getInfosToken(token);
        
         if(decoded){
              this.test=true;
                 }
                 else{
                  this.test=false; 
                 }
         }
       
      )
  })
    
  }
  // fonction qui vérifie si un utilisateur est connecté 
  isLogin(){  
    return this.test;
  }
}
