import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header-transaction',
  templateUrl: './header-transaction.page.html',
  styleUrls: ['./header-transaction.page.scss'],
})
export class HeaderTransactionPage implements OnInit {
  
  @Input()  depot="";
  @Input()  src="";
  
  constructor( public navCtrl : NavController) { }

  ngOnInit() {
  }
  
  
   Back(){
  this.navCtrl.back();
  

   }
   

}
