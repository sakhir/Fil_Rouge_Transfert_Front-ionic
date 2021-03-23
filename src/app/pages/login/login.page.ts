import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {  BehaviorSubject } from  'rxjs';
import { Storage } from  '@ionic/storage';


import { AuthentificationService } from 'src/app/services/authentification.service';
import { User } from 'src/app/Models/Users/User';
//const helper = new JwtHelperService();
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  authSubject  =  new  BehaviorSubject(false);
  email : string | any;
  password : string | any;
  formLogin : FormGroup | any;
  submitted = false;
  User: User;
  loggedIn:boolean=false; // est ce que y a quelqu un qui s est connecté   
  register={
    email:null,
    password:null
  }
  private loading;
  constructor(private authService: AuthService,private formBuilder: FormBuilder ,private router:Router,
    private loadingctrl:LoadingController , private  autha : AuthentificationService ,private alertCtrl :AlertController ,private navCtrl: NavController,
    private  ActivatedRoute:ActivatedRoute , private storage :Storage) { }

  ngOnInit() {
  //   this.ActivatedRoute.params.subscribe(()=>{

  //     this.storage.get('token').then(token=> {
  //       var decoded=this.autha.getInfosToken(token);
  //         console.log(decoded);
          
  //        if(decoded){
  //            console.log(true);
             
  //                }
  //                else{
  //                 console.log(false);
                   
  //                }
  //        }
       
  //     )
  // })
   
    this.formLogin = this.formBuilder.group({
      email: ['',[ Validators.required,Validators.email]],
      password: ['',[ Validators.required,Validators.minLength(6)]]
    })

  }
  get f(){
    return this.formLogin.controls
  }
  onSubmit(){
    this.submitted = true;
     if (this.formLogin.invalid) {
       return;
   }
    
     
     
     this.authService.login(this.email,this.password).subscribe( (data:any) => {

        // le triatement si le formulaire est valid 
     this.loadingctrl.create({
      message: 'Connexion...'
    }).then((overlay)=>{ this.loading = overlay;
      this.loading.present();
    });
      
        setTimeout(()=>{
          this.loading.dismiss();
          localStorage.setItem('token',data.token);
         // console.log(data);
        // const decoded = helper.decodeToken(data.token);
         //console.log(decoded);
          this.router.navigateByUrl('agence');
          this.loggedIn=true;
        },3000) 

             
  
     },err => alert('Données invalides'))


     
   }




   OnSubmitted() {
    this.submitted = true;
    if (this.formLogin.invalid) {
      return;
  }
   
    
  
    this.autha.login(this.email,this.password).subscribe( (data:any) => {
  //console.log(data);
  
       // le triatement si le formulaire est valid 
    this.loadingctrl.create({
     message: 'Connexion...'
   }).then((overlay)=>{ this.loading = overlay;
     this.loading.present();
   });
   setTimeout(()=>{
     this.loading.dismiss();
    if (data) {

      this.autha.SaveInfosToken(data['token']);
      this.router.navigateByUrl('/agence');
    }   
   } ,2000) 
     
    }, (err:any) => { 
      console.log(err)
      setTimeout(

       async ()=>{
         const alert = await this.alertCtrl.create({
           header: 'Message',
           message: 'Données incorrectes',
           buttons: ['Ok']
         });
        await alert.present();
     },2000)
    
     
   })


   }

}
