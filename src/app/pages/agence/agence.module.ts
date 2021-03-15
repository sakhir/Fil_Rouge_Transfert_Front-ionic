import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgencePageRoutingModule } from './agence-routing.module';

import { AgencePage } from './agence.page';
import { TabsComponent } from './tabs/tabs.component';
import { ListPage } from './list/list.page';
import { FootComponent } from './foot/foot.component';
import { MenuPage } from '../menu/menu.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
   
    AgencePageRoutingModule
  ],
  declarations: [AgencePage,TabsComponent,FootComponent,ListPage,MenuPage]
})
export class AgencePageModule {}
