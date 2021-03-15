import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mtransactions',
  templateUrl: './mtransactions.page.html',
  styleUrls: ['./mtransactions.page.scss'],
})
export class MtransactionsPage implements OnInit {
  page='Mes Transactions';
  src="assets/icon/transaction.svg";
  constructor() { }

  ngOnInit() {
  }

}
