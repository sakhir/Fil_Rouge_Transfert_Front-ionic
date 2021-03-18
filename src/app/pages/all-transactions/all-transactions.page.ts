import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.page.html',
  styleUrls: ['./all-transactions.page.scss'],
})
export class AllTransactionsPage implements OnInit {
  page='les transactions';
  src="assets/icon/all-transaction.svg";
  constructor(private transServ :TransactionService) { }

  trans:any;
  ngOnInit() {
    this.gettransactions();
  }


  // recuperer les partenaires
gettransactions(){
  this.transServ.getTransactions().subscribe(
    data=>{
     
      this.trans=data; 

      console.log(data);
        
    },
    err =>console.log(err));
}

}
