import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from  '@ionic/storage';
import { ViewEncapsulation } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-commission',
  templateUrl: './commission.page.html',
  styleUrls: ['./commission.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommissionPage implements OnInit {
  @ViewChild('myTable') table: any;
  columns: any;
rows: any;
temp = [];
expanded: any = {};
timeout: any;  
  page='Mes Commissions';
  src="assets/icon/commis.svg";
  id:any;
role:any;
mtrans:any;

t:any;

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
  this.columns = [
    { name: 'Date' },
    { name: 'Montant' },
    { name: 'type' }
  ];
    
  }

  getMCommissions(){
    this.transServ.getMtransactions(this.id).subscribe(
      data=>{
       
        this.temp = [...data];
        this.mtrans=data;
        this.rows = data;
        this.t=0;
          for (let index = 0; index < data.length; index++) {
            if(data[index]['commissionEnvoi']!=null) {
            this.t=this.t+data[index]['commissionEnvoi'];
            }
            if(data[index]['commissionRetrait']!=null) {
              this.t=this.t+data[index]['commissionRetrait'];
              }
            
          }
          
        
          
      },
      err =>console.log(err));
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
