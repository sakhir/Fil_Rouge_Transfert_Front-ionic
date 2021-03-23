import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllTransactionsPageRoutingModule } from './all-transactions-routing.module';

import { AllTransactionsPage } from './all-transactions.page';
import { HeaderTransactionPage } from '../header-transaction/header-transaction.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllTransactionsPageRoutingModule,
    NgxDatatableModule 
  ],
  declarations: [AllTransactionsPage,HeaderTransactionPage]
})
export class AllTransactionsPageModule {}
