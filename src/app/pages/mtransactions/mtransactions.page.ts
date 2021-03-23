import { Component, OnInit ,ViewChild  } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { TransactionService } from 'src/app/services/transaction.service';
import { AuthentificationService } from 'src/app/services/authentification.service';

import { ViewEncapsulation } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Storage } from  '@ionic/storage';
import { AgenceService } from 'src/app/services/agence.service';
const helper = new JwtHelperService();
@Component({
  selector: 'app-mtransactions',
  templateUrl: './mtransactions.page.html',
  styleUrls: ['./mtransactions.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MtransactionsPage implements OnInit {
  @ViewChild('myTable') table: any;
  columns: any;
rows: any;
temp = [];
expanded: any = {};
timeout: any;  
t:any;
  page='Mes Transactions';
  src="assets/icon/transaction.svg";
  constructor( private auth :AuthService , private transServ :TransactionService , private autha :AuthentificationService , private ActivatedRoute : ActivatedRoute,private  storage:  Storage) { }
id:any;
role:any;
  ngOnInit() {
  
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
  
this.columns = [
  { name: 'Date' },
  { name: 'Montant' },
  { name: 'type' }
];




  }
 mtrans:any;

// recuperer les partenaires
getMtransactions(){
  this.transServ.getMtransactions(this.id).subscribe(
    data=>{
      this.temp = [...data];
      this.mtrans=data;
      this.rows = data;
      this.t=0;
      for (let index = 0; index < data.length; index++) {
        this.t=this.t+data[index]['montantEnvoyer'];
      }
     // console.log(data);
        
    },
    err =>console.log(err));
}
updateFilter(event) {
  const val = event.target.value.toLowerCase();

  // filter our data
  const temp = this.temp.filter(function (d) {
    return d.type.toLowerCase().indexOf(val) !== -1 || !val;
  });

  // update the rows
  this.rows = temp;
 
}
onPage(event) {
  clearTimeout(this.timeout);
  this.timeout = setTimeout(() => {
    // console.log('paged!', event);
  }, 100);
}
toggleExpandRow(row) {
 // console.log('Toggled Expand Row!', row);
  this.table.rowDetail.toggleExpandRow(row);
}

onDetailToggle(event) {
 // console.log('Detail Toggled', event);
} 
}
