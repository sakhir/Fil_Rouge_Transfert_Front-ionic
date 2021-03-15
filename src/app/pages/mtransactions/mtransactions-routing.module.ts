import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MtransactionsPage } from './mtransactions.page';

const routes: Routes = [
  {
    path: '',
    component: MtransactionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MtransactionsPageRoutingModule {}
