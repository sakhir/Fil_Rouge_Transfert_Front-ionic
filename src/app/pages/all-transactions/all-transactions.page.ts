import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.page.html',
  styleUrls: ['./all-transactions.page.scss'],
})
export class AllTransactionsPage implements OnInit {
  page='Toutes les transactions';
  src="assets/icon/all-transaction.svg";
  constructor() { }

  ngOnInit() {
  }

}
