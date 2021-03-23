import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListDepotPageRoutingModule } from './list-depot-routing.module';

import { ListDepotPage } from './list-depot.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDatatableModule,
    ListDepotPageRoutingModule
  ],
  declarations: [ListDepotPage]
})
export class ListDepotPageModule {}
