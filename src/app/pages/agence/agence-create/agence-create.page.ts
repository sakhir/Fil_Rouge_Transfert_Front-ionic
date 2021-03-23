import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  MenuController, LoadingController } from '@ionic/angular';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { AgenceService } from 'src/app/services/agence.service';

@Component({
  selector: 'app-agence-create',
  templateUrl: './agence-create.page.html',
  styleUrls: ['./agence-create.page.scss'],
})
export class AgenceCreatePage implements OnInit {
  public AgenceForm: FormGroup;
  submitted = false;
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder ,
    private authService: AuthService,
    private agserv : AgenceService,
    private router: Router,
    private alertCtrl :AlertController
  ) { }

  ngOnInit() {
    this.AgenceForm = this.formBuilder.group({
      'nin': [null, Validators.compose([
        Validators.required
      ])],
      'local': [null, Validators.compose([
        Validators.required
      ])],
      'dac': [null, Validators.compose([
        Validators.required
      ])],
      'nag': [null, Validators.compose([
        Validators.required
      ])]
    });
  
  }
  A: any = {};
  registerAgenceData:any = { 
      ninea:  null,
      localisation:  null,
      domaineActivite: null,
      nomPartenaire: null
           
  };
  Back(){
    this.navCtrl.back();
    
     }
  async registerAgence() {
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();

    // traitement
    this.submitted = true;
    if (this.AgenceForm.invalid) {
      return;
  }
 
    this.agserv.registerAgence(this.registerAgenceData)
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
      this.navCtrl.navigateRoot('/agence/list-agences');
    });
  }

}
