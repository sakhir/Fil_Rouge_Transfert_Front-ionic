import { Component, HostListener, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AlertController, LoadingController, MenuController, NavController, ToastController } from '@ionic/angular';
import { from } from 'rxjs';
import { AgenceService } from 'src/app/services/agence.service';
import { AuthService } from 'src/app/services/auth.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Storage } from  '@ionic/storage';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
const helper = new JwtHelperService();
@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  constructor(private auth :AuthService ,private agSer : AgenceService ,private alertCtrl :AlertController ,public loadingCtrl: LoadingController
    ,private toastCtrl: ToastController,public menuCtrl: MenuController,public navCtrl: NavController ,private autha:AuthentificationService , private ActivatedRoute : ActivatedRoute,
    private  storage:  Storage ) { }
  compte:any;
  avatar:any;
  role:any;
  U:any;
  id:any;
  user: object;
  compt:any;
  da:any;
  ngOnInit() {
  
    this.ActivatedRoute.params.subscribe(()=>{
      
      this.storage.get('token').then(token=> {
        //console.log(this.autha.getInfosToken(token));
        
        var decoded=this.autha.getInfosToken(token);
         if(decoded){
            this.id=decoded.id;
            this.getOneUser();
            this.compte = this.compt;
            this.avatar=decoded.avatar;
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
 getOneUser() {
  this.auth.getOneUser(this.id).subscribe(
    data=>{ 
      this.compt=data['compte'].solde;
      this.da=data['compte'].datemaj; 
      //console.log(data);
      
           
    },
    err =>console.log(err));
}
// fonction pour deposer de l argent 
async AnnulerDernierDepot() {
  

  const alert = await  this.alertCtrl.create({
    header: 'Confirmation',
    message: '<h4>Voulez vous annuler votre dernier depot ?</h4> ',
    buttons: [
      {
        text: 'Annuler',
        handler: () => {
          console.log('Annuler');
        }
      },
      {
        text: 'Confirmer',
         handler:async  () => {
          console.log('Confirmer');
          const loader = await this.loadingCtrl.create({
            duration: 2000
          });
       
         loader.present();

         this.agSer.AnnulerDernierDepot()
         .subscribe(
           (res:any) =>{
              
            setTimeout(

              async ()=>{
                const alert = await this.alertCtrl.create({
                  header: 'Message',
                  message: res,
                  buttons: ['Ok']
                });
                alert.present();
            },2000)
             
          
           },
           async (err:any) => { 
             console.log(err)
             //console.log(this.TransactionForm.value.nomE)
             setTimeout(

              async ()=>{
              const alert = await this.alertCtrl.create({
                  header: 'Message',
                  message: err,
                  buttons: ['Ok']
                });
                alert.present();
            },2000)
           
            
          })
         // fin traitement 
        loader.onWillDismiss().then(() => {
          this.navCtrl.navigateRoot('/agence');
        });
              }
      }
    ]
  }).then(res => {
    res.present();
  });
 

}
}
