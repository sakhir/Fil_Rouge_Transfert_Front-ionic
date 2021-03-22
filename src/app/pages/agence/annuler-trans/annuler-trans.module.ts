import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnnulerTransPageRoutingModule } from './annuler-trans-routing.module';

import { AnnulerTransPage } from './annuler-trans.page';
import { HeaderTransactionPage } from '../../header-transaction/header-transaction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AnnulerTransPageRoutingModule
  ],
  declarations: [AnnulerTransPage,HeaderTransactionPage]
})
export class AnnulerTransPageModule {}
