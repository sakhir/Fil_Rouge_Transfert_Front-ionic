import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgenceCreatePage } from './agence-create.page';

const routes: Routes = [
  {
    path: '',
    component: AgenceCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgenceCreatePageRoutingModule {}
