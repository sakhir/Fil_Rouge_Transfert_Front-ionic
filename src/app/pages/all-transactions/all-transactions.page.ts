import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { ViewEncapsulation } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Storage } from  '@ionic/storage';
import { AgenceService } from 'src/app/services/agence.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.page.html',
  styleUrls: ['./all-transactions.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AllTransactionsPage implements OnInit {
  @ViewChild('myTable') table: any;
  columns: any;
rows: any;
temp = [];
expanded: any = {};
timeout: any;  
  page='les transactions';
  src="assets/icon/all-transaction.svg";
  constructor(private transServ :TransactionService ,private auth :AuthService ,private alertCtrl :AlertController,public navCtrl: NavController,public loadingCtrl: LoadingController ,
    private ActivatedRoute : ActivatedRoute ,private  storage:  Storage ,private agSer :AgenceService) { }

  trans:any;
  t:any;
  ngOnInit() {
   

    this.ActivatedRoute.params.subscribe(()=>{
      
      this.storage.get('token').then(token=> {
        this.gettransactions();
            }
       
      )
  })
  this.columns = [
    { name: 'Date' },
    { name: 'Montant' }
  ];

  }


  // recuperer les partenaires
gettransactions(){
  this.transServ.getTransactions().subscribe(
    data=>{    
      this.temp = [...data];
      this.trans=data;
      this.rows = data;
      this.t=0;
      for (let index = 0; index < data.length; index++) {
        this.t=this.t+data[index]['montantEnvoyer'];
      }

        
    },
    err =>console.log(err));
}
updateFilter(event) {
  const val = event.target.value.toLowerCase();

  // filter our data
  const temp = this.temp.filter(function (d) {
    return d.nom.toLowerCase().indexOf(val) !== -1 || !val;
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
