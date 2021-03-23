import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListUsersPageRoutingModule } from './list-users-routing.module';

import { ListUsersPage } from './list-users.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListUsersPageRoutingModule ,
    NgxDatatableModule 
  ],
  declarations: [ListUsersPage]
})
export class ListUsersPageModule {}
