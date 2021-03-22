import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  MenuController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Agence } from 'src/app/Models/Agence/Agence';

@Component({
  selector: 'app-ajout-user',
  templateUrl: './ajout-user.page.html',
  styleUrls: ['./ajout-user.page.scss'],
})
export class AjoutUserPage implements OnInit {
  public onRegisterForm: FormGroup;
  submitted = false;
  agences:any;
  profils:any;
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder ,
    private authService: AuthService,
    private router: Router ,
    private alertCtrl :AlertController
    ) {
    
   }



  ngOnInit() {
     this.getPartenaires();
     this.getProfils();
    this.onRegisterForm = this.formBuilder.group({
      'prenom': [null, Validators.compose([
        Validators.required
      ])],
      'nom': [null, Validators.compose([
        Validators.required
      ])],
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'adress': [null, Validators.compose([
        Validators.required
      ])],
      'tel': [null, Validators.compose([
        Validators.required
      ])],
      'profil': [null, Validators.compose([
        Validators.required
      ])],
      'agence': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
  }
  imageUrl:string="/assets/avat.png";
  registerUserData = { 
    username:  null,
      password:  null,
      nom: null,
      prenom: null,
      adresse: null,
      email: null,
      telephone: null,
      imageName : File=null,
      profil: null,
      agence:null,
           
  };

// recuperer les partenaires
getPartenaires(){
  this.authService.getAgences().subscribe(
    data=>{
     
      this.agences=data;   
    },
    err =>console.log(err));
}


//Recuperer les profils 
getProfils(){
  this.authService.allProfils().subscribe(
    data=>{
     
      this.profils=data;  
      //console.log(data);   
    },
    err =>console.log(err));
}

  async registerUser() {
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();

    // traitement
    this.submitted = true;
    if (this.onRegisterForm.invalid) {
      return;
  }
 
    this.authService.registerUser(this.registerUserData)
    .subscribe(
      (res:any) =>{
        //console.log(this.registerUserData)  
      // this.router.navigateByUrl("/agence");       
       async ()=>{
        const alert = await this.alertCtrl.create({
          header: 'Message',
          message: res,
          buttons: ['Ok']
        });
        alert.present();
    }
        
     
      },
      (err:any) => { 
        console.log(err)
        //console.log(this.registerUserData)
        async ()=>{
          const alert = await this.alertCtrl.create({
            header: 'Message',
            message: err,
            buttons: ['Ok']
          });
          alert.present();
      }
     })
    // fin traitement 
    loader.onWillDismiss().then(() => {
      this.navCtrl.navigateRoot('/agence');
    });
  }

  // // //
  goToLogin() {
    this.navCtrl.navigateRoot('/agence');
  }
  // back
  Back(){
    this.navCtrl.back();
    
     }

     handleFileInput(file : FileList){
      this.registerUserData.imageName = file.item(0);
  
      //show image preview 
      var reader =  new  FileReader();
      reader.onload = (event:any) => {
        this.imageUrl = event.target.result;
      }
      reader.readAsDataURL(this.registerUserData.imageName);
    }
    isSuperAdmin(){
      return this.authService.isSuperAdmin();
    }
  
    isCaissier(){
      return this.authService.isCaissier();
    }
  
    isPartenaire(){
      return this.authService.isPartenaire();
    }
  
    isAdminWari(){
      return this.authService.isAdminSystem();
    }
  
    isUser(){
      return this.authService.isUser();
    }
  
    isAdminPartenaire(){
      return this.authService.isAdminPartenaire();
    }

}
