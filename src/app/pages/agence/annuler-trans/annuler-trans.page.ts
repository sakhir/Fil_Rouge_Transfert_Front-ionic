import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, MenuController, NavController } from '@ionic/angular';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-annuler-trans',
  templateUrl: './annuler-trans.page.html',
  styleUrls: ['./annuler-trans.page.scss'],
})
export class AnnulerTransPage implements OnInit {
  page='Annuler Transaction';
  src="assets/icon/retrait.svg";
  public CancelForm: FormGroup;
  constructor(  public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
   private tranServ :TransactionService,
   private alertCtrl :AlertController) { }
   annuler:any = {
    codeTransaction:null
   }
   t:any;

  ngOnInit() {
    this.CancelForm = new FormGroup({
      codeTransaction: new FormControl('',[Validators.minLength(14), Validators.maxLength(14), Validators.required])
      
  })
  }
  // les messages de validation 
  transaction_validation_message = {
    'codeTransaction': [
      { type: 'required', message: 'Ce champ est requis' },
      { type: 'maxlength', message: 'Ce champ doit avoir au max 14 chiffres' },
      { type: 'minlength', message: 'Ce champ doit avoir au min 14 chiffres' },
    ]

  }

  TrouverCode(){
    
    //console.log(this.depot);

    this.tranServ.TrouverCode(this.annuler).subscribe(
      resp =>{
        this.t=resp; 

      },
      error => console.log(error)
    )
  } 


    // fonction pour deposer de l argent 
async AnnulerTransaction() {
  const alert = await  this.alertCtrl.create({
    header: 'Confirmation',
    message: '<h4>Annuler la transaction ? </h4>',
    buttons: [
      {
        text: 'Annuler',
        handler: () => {
        }
      },
      {
        text: 'Confirmer',
         handler:async  () => {
         
          const loader = await this.loadingCtrl.create({
            duration: 2000
          });
       
         loader.present();
         
         this.tranServ.AnnulerTans(this.CancelForm.value)
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

}
