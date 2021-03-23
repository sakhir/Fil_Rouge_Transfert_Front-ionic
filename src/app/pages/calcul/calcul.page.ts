import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { AgenceService } from 'src/app/services/agence.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calcul',
  templateUrl: './calcul.page.html',
  styleUrls: ['./calcul.page.scss'],
})
export class CalculPage implements OnInit {
  page='Calculateur de frais';
  src="assets/icon/calculator.svg";
  public CalculForm: FormGroup;
  submitted = false;
  calcul:any = { 
    montant:  null,
  }
  constructor( private formBuilder: FormBuilder ,
    private agserv : AgenceService,public loadingCtrl: LoadingController  , private alertCtrl : AlertController,
    private router: Router,public navCtrl: NavController,private toastCtrl: ToastController) { }

  ngOnInit() {
    this.CalculForm = this.formBuilder.group({
      'mont': [null, Validators.compose([
        Validators.required
      ])]
  });

}


async TrouverTarif(){
  const loader = await this.loadingCtrl.create({
    duration: 2000
  });

  loader.present();

  // traitement
  this.submitted = true;
  if (this.CalculForm.invalid) {
    return;
}
 console.log(this.calcul);
 
this.agserv.TrouverTarif(this.calcul)
.subscribe(
  (res:any) =>{
    console.log(res);

    loader.onWillDismiss().then(async l => {
      // const toast = await this.toastCtrl.create({
      //   cssClass: 'primary',
      //   message: res,
      //   duration: 5000,
      //   position: 'top'
      // });

      // toast.present();

     const alert= await  this.alertCtrl.create({
       header:'Calculateur',

       subHeader:'Pour une transaction de : '+ this.calcul.montant+', ',
       message:'Le frais est égal à  :'+res ,
       cssClass:'alertCalcul',
       buttons:['retour']
       
     })
      await alert.present();

     // this.navCtrl.navigateForward('/agence');
    });
    //fin test 
    
 
  },
  (err:any) => { 
    console.log(err)
    Swal.fire(
      
        'Erreur lors du traitement '
    )
   
 })



}
}
