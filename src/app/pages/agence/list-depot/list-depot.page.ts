import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ViewEncapsulation } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Storage } from  '@ionic/storage';
import { AgenceService } from 'src/app/services/agence.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
@Component({
  selector: 'app-list-depot',
  templateUrl: './list-depot.page.html',
  styleUrls: ['./list-depot.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListDepotPage implements OnInit {
  @ViewChild('myTable') table: any;
  depots:any;
  
  columns: any;
  rows: any;
  temp = [];
  expanded: any = {};
  timeout: any;
  role:any;
  id:any;
  t:any;
  constructor(public navCtrl: NavController ,private agSer :AgenceService, private autha :AuthentificationService , private ActivatedRoute : ActivatedRoute,private  storage:  Storage) { }

  ngOnInit() {
    this.storage.get('token').then(token=> {
      //console.log(this.autha.getInfosToken(token));
      var decoded=this.autha.getInfosToken(token);
       if(decoded){
          this.id=decoded.id;
          this.getMdepots();
          this.role=decoded.roles[0];
         
               }
          }
     
    )

  
this.columns = [
  { name: 'Date' },
  { name: 'Montant' },
  { name: 'type' }
];

  
}
Back(){
  this.navCtrl.back();
  
   }
getMdepots(){
  this.agSer.getMdepots(this.id).subscribe(
    data=>{
      this.temp = [...data];
      this.depots=data;
      this.rows = data;
      this.t=0;
      for (let index = 0; index < data.length; index++) {
         this.t=this.t+data[index]['montantDepot'];
       }
      //console.log(data);
        
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
  this.table.rowDetail.toggleExpandRow(row);
}



}
