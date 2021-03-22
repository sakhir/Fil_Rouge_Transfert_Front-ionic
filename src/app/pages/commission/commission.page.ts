import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from  '@ionic/storage';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.page.html',
  styleUrls: ['./commission.page.scss'],
})
export class CommissionPage implements OnInit {
  page='Mes Commissions';
  src="assets/icon/commis.svg";
  id:any;
role:any;
mtrans:any;

  constructor( private ActivatedRoute : ActivatedRoute,private  storage:  Storage , private transServ :TransactionService , private autha :AuthentificationService ) { }

  ngOnInit() {
    this.ActivatedRoute.params.subscribe(()=>{
      
      this.storage.get('token').then(token=> {
        //console.log(this.autha.getInfosToken(token));
        var decoded=this.autha.getInfosToken(token);
         if(decoded){
            this.id=decoded.id;
            this.getMCommissions();
            this.role=decoded.roles[0];
           
                 }
            }
       
      )
  })
    
  }

  getMCommissions(){
    this.transServ.getMtransactions(this.id).subscribe(
      data=>{
       
        this.mtrans=data; 
        console.log(data);
          
      },
      err =>console.log(err));
  }
  

}
