import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ViewEncapsulation } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Storage } from  '@ionic/storage';
import { AgenceService } from 'src/app/services/agence.service';
@Component({
  selector: 'app-list-agences',
  templateUrl: './list-agences.page.html',
  styleUrls: ['./list-agences.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListAgencesPage implements OnInit {
  @ViewChild('myTable') table: any;
agences:any;

columns: any;
rows: any;
temp = [];
expanded: any = {};
timeout: any;

  constructor( private auth :AuthService ,private alertCtrl :AlertController,public navCtrl: NavController,public loadingCtrl: LoadingController ,
    private ActivatedRoute : ActivatedRoute ,private  storage:  Storage ,private agSer :AgenceService) { }

  ngOnInit() {
    this.ActivatedRoute.params.subscribe(()=>{
      
      this.storage.get('token').then(token=> {
        this.getAgences();
            }
       
      )
  })
  this.columns = [
    { name: 'Nom Agence' },
    { name: 'Action' }
  ];

  }

   // recuperer les partenaires
getAgences(){
  this.auth.getAgences().subscribe(
    data=>{ 
      this.temp = [...data];
      this.agences=data; 
      this.rows = data;
      //console.log(data);
      
     
              
    },
    err =>console.log(err));
}
updateFilter(event) {
  const val = event.target.value.toLowerCase();

  // filter our data
  const temp = this.temp.filter(function (d) {
    return d.nomPartenaire.toLowerCase().indexOf(val) !== -1 || !val;
  });

  // update the rows
  this.rows = temp;
 
}
Back(){
  this.navCtrl.back();
  
   }
// fonction bloquer un utilisateur 
async BloquerAgence(row) {
 
  const alert = await  this.alertCtrl.create({
    header: 'Confirmation',
    message: 'Vouler vous bloquer l agence '+row.nomPartenaire+' ?',
    buttons: [
      {
        text: 'Annuler',
        handler: () => {
          
        }
      },
      {
        text: 'Confirmer',
         handler:async  () => {
         
          const loader = await this.loadingCtrl.create({
            duration: 2000
          });
       
         loader.present();
         
         this.agSer.BloquerAgence(row.id).
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
