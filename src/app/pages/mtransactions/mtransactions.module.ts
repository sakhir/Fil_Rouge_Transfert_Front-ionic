import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MtransactionsPageRoutingModule } from './mtransactions-routing.module';

import { MtransactionsPage } from './mtransactions.page';
import { HeaderTransactionPage } from '../header-transaction/header-transaction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MtransactionsPageRoutingModule
  ],
  declarations: [MtransactionsPage,HeaderTransactionPage]
})
export class MtransactionsPageModule {}
