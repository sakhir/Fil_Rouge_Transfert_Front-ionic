import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AlertController, LoadingController, MenuController, NavController, ToastController } from '@ionic/angular';
import { AgenceService } from 'src/app/services/agence.service';
import { AuthService } from 'src/app/services/auth.service';
const helper = new JwtHelperService();
@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  constructor(private auth :AuthService ,private agSer : AgenceService ,private alertCtrl :AlertController ,public loadingCtrl: LoadingController
    ,private toastCtrl: ToastController,public menuCtrl: MenuController,public navCtrl: NavController) { }
  compte:any;
  avatar:any;
  ngOnInit() {
   
    this.compte=this.GetInfosUserConnecte().compte;
    this.avatar=this.GetInfosUserConnecte().avatar;
 
    
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


// fonction pour deposer de l argent 
async AnnulerDernierDepot() {
  

  const alert = await  this.alertCtrl.create({
    header: 'Confirmation',
    message: '<h4>Message</h4> ',
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
                  header: 'ok',
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
