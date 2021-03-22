import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { TransactionService } from 'src/app/services/transaction.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from  '@ionic/storage';
const helper = new JwtHelperService();
@Component({
  selector: 'app-mtransactions',
  templateUrl: './mtransactions.page.html',
  styleUrls: ['./mtransactions.page.scss'],
})
export class MtransactionsPage implements OnInit {
  page='Mes Transactions';
  src="assets/icon/transaction.svg";
  constructor( private auth :AuthService , private transServ :TransactionService , private autha :AuthentificationService , private ActivatedRoute : ActivatedRoute,private  storage:  Storage) { }
id:any;
role:any;
  ngOnInit() {
   // console.log( this.GetIdUserConnecte());
   
  //  this.autha.userInfo.subscribe(user => {
  //   //alert(user)
  //   if(user){
  //     this.id = user.id;
  //     this.role=user.roles[0];
  //   }
  // })


  this.ActivatedRoute.params.subscribe(()=>{
      
    this.storage.get('token').then(token=> {
      //console.log(this.autha.getInfosToken(token));
      var decoded=this.autha.getInfosToken(token);
       if(decoded){
          this.id=decoded.id;
          this.getMtransactions();
          this.role=decoded.roles[0];
         
               }
          }
     
    )
})
  
 




  }
 mtrans:any;

// recuperer les partenaires
getMtransactions(){
  this.transServ.getMtransactions(this.id).subscribe(
    data=>{
     
      this.mtrans=data; 
     // console.log(data);
        
    },
    err =>console.log(err));
}



}
