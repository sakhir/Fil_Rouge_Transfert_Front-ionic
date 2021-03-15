import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
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
    private router: Router
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
        console.log(this.registerAgenceData)  
       this.router.navigateByUrl("/agence");       
        Swal.fire(
          'Agence ajoutée avec succés !',
          'success'
        )
        
     
      },
      (err:any) => { 
        console.log(err)
        console.log(this.registerAgenceData)
        Swal.fire(
          
            'Erreur lors de l\' ajout'
        )
       
     })
    // fin traitement 
    loader.onWillDismiss().then(() => {
      this.navCtrl.navigateRoot('/agence');
    });
  }

}
