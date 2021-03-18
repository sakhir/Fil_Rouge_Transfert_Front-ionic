import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.page.html',
  styleUrls: ['./list-users.page.scss'],
})
export class ListUsersPage implements OnInit {
 users:any;
  constructor( private auth :AuthService) { }

  ngOnInit() {
    this.getUsers();
  }
   // recuperer les partenaires
   getUsers(){
    this.auth.getUsers().subscribe(
      data=>{
       
        this.users=data;
       // console.log(data[0].profil.libelle);
                 
      },
      err =>console.log(err));
  }
}
