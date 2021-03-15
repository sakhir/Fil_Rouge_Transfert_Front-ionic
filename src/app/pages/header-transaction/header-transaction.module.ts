import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeaderTransactionPageRoutingModule } from './header-transaction-routing.module';

import { HeaderTransactionPage } from './header-transaction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderTransactionPageRoutingModule
  ],
  declarations: [HeaderTransactionPage]
})
export class HeaderTransactionPageModule {}
