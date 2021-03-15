import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepotPageRoutingModule } from './depot-routing.module';

import { DepotPage } from './depot.page';
import { HeaderTransactionPage } from '../header-transaction/header-transaction.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DepotPageRoutingModule
  ],
  declarations: [DepotPage,HeaderTransactionPage]
})
export class DepotPageModule {}
