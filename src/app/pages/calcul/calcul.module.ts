import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalculPageRoutingModule } from './calcul-routing.module';

import { CalculPage } from './calcul.page';
import { HeaderTransactionPage } from '../header-transaction/header-transaction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CalculPageRoutingModule
  ],
  declarations: [CalculPage,HeaderTransactionPage]
})
export class CalculPageModule {}
