import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { AgenceService } from 'src/app/services/agence.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-depot-compte',
  templateUrl: './depot-compte.page.html',
  styleUrls: ['./depot-compte.page.scss','../calcul/calcul.page.scss'],
})
export class DepotComptePage implements OnInit {
  page='Dépot Compte';
  src="assets/icon/depot.svg";
  public DepotForm: FormGroup;
  submitted = false;
  comptes:any;
  depot:any = { 
    ninea:null,
    montant:  null,
  }
  constructor(private formBuilder: FormBuilder ,
    private agserv : AgenceService,public loadingCtrl: LoadingController  ,
    private router: Router,public navCtrl: NavController,private toastCtrl: ToastController ,private alertCtrl :AlertController) { }

  ngOnInit() {
    this.getComptes();
    this.DepotForm = this.formBuilder.group({
      'mont': [null, Validators.compose([
        Validators.required
      ])] ,
      'compt': [null, Validators.compose([
        Validators.required
      ])]

  });
  }


  // recuperer les partenaires
getComptes(){
  this.agserv.getComptes().subscribe(
    data=>{
     
      this.comptes=data;   
    },
    err =>console.log(err));
}


// la fonction pour deposer de l argent dans un compte
async DeposerArgent(){
  const loader = await this.loadingCtrl.create({
    duration: 2000
  });

  loader.present();

  // traitement
  this.submitted = true;
  if (this.DepotForm.invalid) {
    return;
}

this.agserv.DeposerArgent(this.depot)
.subscribe(
  (res:any) =>{
    console.log(res);


    loader.onWillDismiss().then(async l => {
      const alert = await this.alertCtrl.create({
        header: 'Message',
        message: res,
        buttons: ['Ok']
      });
      alert.present();
     // this.navCtrl.navigateForward('/agence');
    });
    //fin test 
    
 
  },
  async (err:any) => { 
    console.log(err)
    const alert = await this.alertCtrl.create({
      header: 'Message',
      message: err,
      buttons: ['Ok']
    });
    alert.present();
   
 })



}
// fin de fonction deposer de l argent dans un compte 

}
