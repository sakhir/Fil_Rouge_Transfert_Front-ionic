import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllTransactionsPageRoutingModule } from './all-transactions-routing.module';

import { AllTransactionsPage } from './all-transactions.page';
import { HeaderTransactionPage } from '../header-transaction/header-transaction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllTransactionsPageRoutingModule
  ],
  declarations: [AllTransactionsPage,HeaderTransactionPage]
})
export class AllTransactionsPageModule {}
