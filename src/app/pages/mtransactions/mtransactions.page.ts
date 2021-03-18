import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { TransactionService } from 'src/app/services/transaction.service';
const helper = new JwtHelperService();
@Component({
  selector: 'app-mtransactions',
  templateUrl: './mtransactions.page.html',
  styleUrls: ['./mtransactions.page.scss'],
})
export class MtransactionsPage implements OnInit {
  page='Mes Transactions';
  src="assets/icon/transaction.svg";
  constructor( private auth :AuthService , private transServ :TransactionService) { }

  ngOnInit() {
   // console.log( this.GetIdUserConnecte());
   this.getMtransactions();
    
  }
 mtrans:any;
 // je dois recuperer l id de l utilisateur qui s est connecté 
 GetIdUserConnecte() {
  const decoded :any= helper.decodeToken(this.auth.getToken());
 return decoded.id;
}

// recuperer les partenaires
getMtransactions(){
  this.transServ.getMtransactions(this.GetIdUserConnecte()).subscribe(
    data=>{
     
      this.mtrans=data; 

      console.log(data);
        
    },
    err =>console.log(err));
}



}
