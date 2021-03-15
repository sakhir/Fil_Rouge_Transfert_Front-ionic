import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable, BehaviorSubject } from  'rxjs';


import { JwtHelperService } from "@auth0/angular-jwt";
const helper = new JwtHelperService();
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
  loggedIn:boolean=false; // est ce que y a quelqu un qui s est connecté   
  register={}
  private loading;
  constructor(private authService: AuthService,private formBuilder: FormBuilder ,private router:Router,
    private loadingctrl:LoadingController) { }

  ngOnInit() {
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
         const decoded = helper.decodeToken(data.token);
         //console.log(decoded);
          this.router.navigateByUrl('agence');
          this.loggedIn=true;
        },3000) 

             
  
     },err => alert('Données invalides'))


     
   }

}
