import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.page.html',
  styleUrls: ['./commission.page.scss'],
})
export class CommissionPage implements OnInit {
  page='Mes Commissions';
  src="assets/icon/commis.svg";
  constructor() { }

  ngOnInit() {
  }

}
