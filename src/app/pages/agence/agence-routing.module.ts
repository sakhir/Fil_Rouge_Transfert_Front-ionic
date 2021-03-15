import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgencePage } from './agence.page';
import { TabsComponent } from './tabs/tabs.component';

const routes: Routes = [
  {
    path: '',
    component: AgencePage
  },
  {
    path: 'agence/tabs',
    component: TabsComponent
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'agence-create',
    loadChildren: () => import('./agence-create/agence-create.module').then( m => m.AgenceCreatePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgencePageRoutingModule {}
