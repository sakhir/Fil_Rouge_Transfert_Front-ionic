
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, NavController, ToastController } from '@ionic/angular';
import { AgenceService } from 'src/app/services/agence.service';
import { TransactionService } from 'src/app/services/transaction.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.page.html',
  styleUrls: ['./retrait.page.scss','../depot/depot.page.scss'],
})
export class RetraitPage implements OnInit {
  page='Retrait';
  src="assets/icon/depot.svg";
  esp='  ';
  public TransactionForm: FormGroup;
  constructor(private agserv : AgenceService ,  public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder ,
   private tranServ :TransactionService,
   private alertCtrl :AlertController,
   private toastCtrl: ToastController,
    private router: Router ,
    private trans:TransactionService) { }

    retrait:any = {
     codeTransaction:null
    }
    t:any;

  ngOnInit() {
    this.TransactionForm = new FormGroup({

      cinB: new FormControl('',[ Validators.minLength(14), Validators.maxLength(14),Validators.required,
        Validators.pattern('[0-9]+')]) ,
      codeTransaction: new FormControl('',[Validators.minLength(14), Validators.maxLength(14), Validators.required])
      
  })
  }

  // fonction pour deposer de l argent 
async Retirer() {
  const alert = await  this.alertCtrl.create({
    header: 'Confirmation',
    message: '<h4>Bénéficiaire</h4>'+ this.t.nomBeneficiaire+' '+this.t.prenomBeneficiaire +'<br/><h4>Téléphone</h4> '+ this.t.telBeneficiaire+'<br/><h4>N° CNI</h4>'+ this.TransactionForm.value.cinB+' <br/><h4>Montant Reçu</h4> '+ this.t.montantEnvoyer+'<br/><h4>Émetteur</h4> '+ this.t.nomEnvoyeur+' '+this.t.prenomEnvoyeur +'<br/><h4>Téléphone</h4> '+this.t.telEnvoyeur+' <br/>',
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
         
         this.tranServ.retirerTans(this.TransactionForm.value)
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
           (err:any) => { 
             console.log(err)
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


  TrouverCode(){
    
    //console.log(this.depot);

    this.tranServ.TrouverCode(this.retrait).subscribe(
      resp =>{
      
        //this.depot.tarif=resp.toString(); 
        console.log(resp);
        this.t=resp;
        
        

      },
      error => console.log(error)
    )
  } 

  // les messages de validation 
  transaction_validation_message = {
    'CinBeneficiare': [{ type: 'required', message: 'Ce champ est requis' },
      { type: 'maxlength', message: 'Ce champ doit avoir au max 14 chiffres' },
        { type: 'minlength', message: 'Ce champ doit avoir au min 14 chiffres' },
      { type: 'pattern', message: 'Le CNI ne doit contenir que des chiffres' }
      ],
    'codeTransaction': [
      { type: 'required', message: 'Ce champ est requis' },
      { type: 'maxlength', message: 'Ce champ doit avoir au max 14 chiffres' },
      { type: 'minlength', message: 'Ce champ doit avoir au min 14 chiffres' },
    ]

  }
}
