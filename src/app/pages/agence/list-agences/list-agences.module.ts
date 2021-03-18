import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListAgencesPageRoutingModule } from './list-agences-routing.module';

import { ListAgencesPage } from './list-agences.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListAgencesPageRoutingModule
  ],
  declarations: [ListAgencesPage]
})
export class ListAgencesPageModule {}
