import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepotComptePageRoutingModule } from './depot-compte-routing.module';

import { DepotComptePage } from './depot-compte.page';
import { HeaderTransactionPage } from '../header-transaction/header-transaction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DepotComptePageRoutingModule
  ],
  declarations: [DepotComptePage,HeaderTransactionPage]
})
export class DepotComptePageModule {}
