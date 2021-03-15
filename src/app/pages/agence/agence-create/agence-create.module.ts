import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgenceCreatePageRoutingModule } from './agence-create-routing.module';

import { AgenceCreatePage } from './agence-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AgenceCreatePageRoutingModule
  ],
  declarations: [AgenceCreatePage]
})
export class AgenceCreatePageModule {}
