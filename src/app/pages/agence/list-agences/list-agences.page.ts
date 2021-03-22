import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-agences',
  templateUrl: './list-agences.page.html',
  styleUrls: ['./list-agences.page.scss'],
})
export class ListAgencesPage implements OnInit {
agences:any;
  constructor( private auth :AuthService) { }

  ngOnInit() {
  this.getAgences();
  }

   // recuperer les partenaires
getAgences(){
  this.auth.getAgences().subscribe(
    data=>{
     
      this.agences=data; 
      console.log(data);
              
    },
    err =>console.log(err));
}
}
