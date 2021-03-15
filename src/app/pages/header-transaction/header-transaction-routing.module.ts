import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeaderTransactionPage } from './header-transaction.page';

const routes: Routes = [
  {
    path: '',
    component: HeaderTransactionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeaderTransactionPageRoutingModule {}
