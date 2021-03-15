import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, MenuController, NavController } from '@ionic/angular';
import { AgenceService } from 'src/app/services/agence.service';
import { AuthService } from 'src/app/services/auth.service';
import { TransactionService } from 'src/app/services/transaction.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.page.html',
  styleUrls: ['./depot.page.scss'],
})
export class DepotPage implements OnInit {
  public TransactionForm: FormGroup;
  submitted = false;

  page='Dépot';
  src="assets/icon/depot.svg";
  constructor( private agserv : AgenceService ,  public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder ,
   private tranServ :TransactionService,
    private router: Router) { }
  tarif:string='null';
  tr:boolean=false;
  depot:any = {
    cinEnvoyeur:null, 
    montant:  null,
    tarif:null,
    total:null,
  }

  ngOnInit() {

   
  this.TransactionForm = new FormGroup({

    nomE: new FormControl('', [ Validators.maxLength(15),Validators.pattern(/^([a-zA-Z \u00C0-\u00FF]+['-]?[a-zA-Z\u00C0-\u00FF]+){1,30}$/), Validators.required,

    ]),
    telE: new FormControl('', [Validators.minLength(9), Validators.maxLength(9), Validators.required,
      Validators.pattern(/^7[0678]([0-9][0-9][0-9][0-9][0-9][0-9][0-9])/)

    ]),
    telB: new FormControl('', [Validators.minLength(9), Validators.maxLength(9), Validators.required,
      Validators.pattern(/^7[0678]([0-9][0-9][0-9][0-9][0-9][0-9][0-9])/)

    ]),
    prenomE: new FormControl('', [ Validators.maxLength(30),Validators.pattern(/^([a-zA-Z \u00C0-\u00FF]+['-]?[a-zA-Z\u00C0-\u00FF]+){1,30}$/), Validators.required,

    ]),
    prenomB: new FormControl('', [ Validators.maxLength(30),Validators.pattern(/^([a-zA-Z \u00C0-\u00FF]+['-]?[a-zA-Z\u00C0-\u00FF]+){1,30}$/), Validators.required,

    ]),
    nomB: new FormControl('', [ Validators.maxLength(30),Validators.pattern(/^([a-zA-Z \u00C0-\u00FF]+['-]?[a-zA-Z\u00C0-\u00FF]+){1,30}$/), 
    Validators.required,

    ]),

    montant: new FormControl('', [Validators.maxLength(9), Validators.required,
      Validators.pattern('[0-9]+')
  
      ]),
      frais: new FormControl(''),
      total: new FormControl(''),
      codeTransaction: new FormControl('',[Validators.minLength(14), Validators.maxLength(14), Validators.required]),

      cinE: new FormControl('',[ Validators.minLength(14), Validators.maxLength(14),Validators.required,
        Validators.pattern('[0-9]+')])
  })
  }

 
// fonction pour deposer de l argent 
async Deposer() {
  const loader = await this.loadingCtrl.create({
    duration: 3000
  });

  loader.present();

  // traitement
//   this.submitted = true;
//   if (this.TransactionForm.invalid) {
//     return;
// }


  this.tranServ.registerTans(this.TransactionForm.value)
  .subscribe(
    (res:any) =>{
       
     this.router.navigateByUrl("/agence"); 
     console.log(this.TransactionForm.value)      
      Swal.fire(
        'AJOUT AVEC SUCCES!',
        'success'
      )
      
   
    },
    (err:any) => { 
      console.log(err)
      console.log(this.TransactionForm.value.nomE)
      Swal.fire(
        
          'Erreur lors de l ajout'
      )
     
   })
  // fin traitement 
  loader.onWillDismiss().then(() => {
    this.navCtrl.navigateRoot('/agence');
  });
}

// fin fonction deposer 

  TrouverTarif(){


    
    this.depot.montant=Number(this.depot.montant);
    //console.log(this.depot);

    this.agserv.TrouverTarif(this.depot).subscribe(
      resp =>{
        this.tr=true;
        this.depot.tarif=resp.toString();  
        console.log(this.tarif)
        this.depot.total=Number(this.depot.tarif)+Number(this.depot.montant);

      },
      error => console.log(error)
    )
  }

     // les messages de validation 
     transaction_validation_message = {

      'nomEnvoyeur': [
        { type: 'required', message: 'Ce champ est requis' },
        { type: 'maxlength', message: 'Ce champ doit avoir au max 15 caracteres' },
        { type: 'pattern', message: 'Le nom  n\'est pas valide ' },
      ],
      'prenomEnvoyeur': [
        { type: 'required', message: 'Ce champ est requis' },
        { type: 'maxlength', message: 'Ce champ doit avoir au max 15 caracteres' },
        { type: 'pattern', message: 'Le prenom  n\'est pas valide ' },
      ],
      'prenomBeneficiaire': [
        { type: 'required', message: 'Ce champ est requis' },
        { type: 'maxlength', message: 'Ce champ doit avoir au max 15 caracteres' },
        { type: 'pattern', message: 'Le prenom  n\'est pas valide ' },
      ],
      'telEnvoyeur': [{ type: 'required', message: 'Ce champ est requis' },
      { type: 'minlength', message: 'Ce champ doit avoir au min 9 caracteres' },
      { type: 'maxlength', message: 'Ce champ doit avoir au max 9 caracteres' },
      { type: 'pattern', message: 'le numero doit commencer par 77,78,76,70...' }
      ],
      'nomBeneficiaire': [ { type: 'required', message: 'Ce champ est requis' },
      { type: 'maxlength', message: 'Ce champ doit avoir au max 15 caracteres' },
      { type: 'pattern', message: 'Le nom  n\'est pas valide ' }
      ],
      'telBeneficiaire': [{ type: 'required', message: 'Ce champ est requis' },
      { type: 'minlength', message: 'Ce champ doit avoir au min 9 caracteres' },
      { type: 'maxlength', message: 'Ce champ doit avoir au max 9 caracteres' },
      { type: 'pattern', message: 'le numero commencent par 77,78,76,70...' }
      ],
      'montantEnvoyer': [{ type: 'required', message: 'Ce champ est requis' },
      { type: 'maxlength', message: 'Ce champ doit avoir au max 9 caracteres' },
      { type: 'pattern', message: 'Le montant ne contient que des chiffres' },
      
      ],
      'codeTransaction': [
        { type: 'required', message: 'Ce champ est requis' },
        { type: 'maxlength', message: 'Ce champ doit avoir au max 12 chiffres' },
        { type: 'minlength', message: 'Ce champ doit avoir au min 12 chiffres' },
      ],
      
      'CinEnvoyeur': [{ type: 'required', message: 'Ce champ est requis' },
      { type: 'maxlength', message: 'Ce champ doit avoir au max 14 chiffres' },
        { type: 'minlength', message: 'Ce champ doit avoir au min 14 chiffres' },
      { type: 'pattern', message: 'Le CNI ne doit contenir que des chiffres' }
      ]
  
    }
}
