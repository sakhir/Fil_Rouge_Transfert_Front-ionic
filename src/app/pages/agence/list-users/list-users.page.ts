import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ViewEncapsulation } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Storage } from  '@ionic/storage';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.page.html',
  styleUrls: ['./list-users.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListUsersPage implements OnInit {
  @ViewChild('myTable') table: any;
 users:any;

 columns: any;
rows: any;
temp = [];
expanded: any = {};
timeout: any;

  constructor( private auth :AuthService,private alertCtrl :AlertController,public navCtrl: NavController,public loadingCtrl: LoadingController ,
    private ActivatedRoute : ActivatedRoute ,private  storage:  Storage) {
    
   }

  ngOnInit() {

  
    this.ActivatedRoute.params.subscribe(()=>{
      
      this.storage.get('token').then(token=> {
        //console.log(this.autha.getInfosToken(token));
        this.getUsers();
            }
       
      )
  })
    this.columns = [
      { name: 'Prenom' },
      { name: 'Nom' },
      { name: 'Profil' },
      { name: 'Actions' }
    ];

  

  }
  
   // recuperer les partenaires
   getUsers(){
    this.auth.getUsers().subscribe(
      data=>{
        this.temp = [...data];
        this.users=data;
        this.rows = data;
      },
      err =>console.log(err));
  }
  Back(){
    this.navCtrl.back();
    
     }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.nom.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    //this.table.offset = 0;
  }
  async DeleteUser(row) {
 
const alert = await  this.alertCtrl.create({
  header: 'Confirmation',
  message: 'Vouler vous supprimer l utilisateur '+row.prenom+' '+row.nom,
  buttons: [
    {
      text: 'Annuler',
      handler: () => {
        console.log('Annuler');
      }
    },
    {
      text: 'Confirmer',
       handler:async  () => {
       
        const loader = await this.loadingCtrl.create({
          duration: 2000
        });
     
       loader.present();
       this.auth.DeleteUser(row.id).
       subscribe(
          (res:any) =>{
            
          setTimeout(

            async ()=>{
              const alert = await this.alertCtrl.create({
                header: 'Message',
                message: res,
                buttons: ['Ok']
              });
              alert.present();
          },2000)
          
           
        
         },
         (err:any) => { 
           console.log(err)
           setTimeout(

            async ()=>{
              const alert = await this.alertCtrl.create({
                header: 'Message',
                message: err,
                buttons: ['Ok']
              });
              alert.present();
          },2000)
         
          
        })
       // fin traitement 
      loader.onWillDismiss().then(() => {
        this.navCtrl.navigateRoot('/agence');
      });
            }
    }
  ]
}).then(res => {
  res.present();
});
  
}


// fonction bloquer un utilisateur 
async BloquerUser(row) {
 
  const alert = await  this.alertCtrl.create({
    header: 'Confirmation',
    message: 'Vouler vous bloquer l utilisateur '+row.prenom+' '+row.nom,
    buttons: [
      {
        text: 'Annuler',
        handler: () => {
          console.log('Annuler');
        }
      },
      {
        text: 'Confirmer',
         handler:async  () => {
         
          const loader = await this.loadingCtrl.create({
            duration: 2000
          });
       
         loader.present();
         
         this.auth.BloquerUser(row.id).
         subscribe(
            (res:any) =>{
              
            setTimeout(
  
              async ()=>{
                const alert = await this.alertCtrl.create({
                  header: 'Message',
                  message: res,
                  buttons: ['Ok']
                });
                alert.present();
            },2000)
            
             
          
           },
           (err:any) => { 
             console.log(err)
             setTimeout(
  
              async ()=>{
                const alert = await this.alertCtrl.create({
                  header: 'Message',
                  message: err,
                  buttons: ['Ok']
                });
                alert.present();
            },2000)
           
            
          })
         // fin traitement 
        loader.onWillDismiss().then(() => {
          this.navCtrl.navigateRoot('/agence/list-users');
        });
              }
      }
    ]
  }).then(res => {
    res.present();
  });
    
  }
  
  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
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