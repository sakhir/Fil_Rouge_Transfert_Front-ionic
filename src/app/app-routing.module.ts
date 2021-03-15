import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './pages/agence/tabs/tabs.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'agence',
    loadChildren: () => import('./pages/agence/agence.module').then( m => m.AgencePageModule)
  },
  {
    path: 'header-transaction',
    loadChildren: () => import('./pages/header-transaction/header-transaction.module').then( m => m.HeaderTransactionPageModule)
  },
  {
    path: 'depot',
    loadChildren: () => import('./pages/depot/depot.module').then( m => m.DepotPageModule)
  },
  {
    path: 'footer',
    loadChildren: () => import('./pages/footer/footer.module').then( m => m.FooterPageModule)
  },
  {
    path: 'retrait',
    loadChildren: () => import('./pages/retrait/retrait.module').then( m => m.RetraitPageModule)
  },
  {
    path: 'calcul',
    loadChildren: () => import('./pages/calcul/calcul.module').then( m => m.CalculPageModule)
  },
  {
    path: 'commission',
    loadChildren: () => import('./pages/commission/commission.module').then( m => m.CommissionPageModule)
  },
  {
    path: 'mtransactions',
    loadChildren: () => import('./pages/mtransactions/mtransactions.module').then( m => m.MtransactionsPageModule)
  },
  {
    path: 'all-transactions',
    loadChildren: () => import('./pages/all-transactions/all-transactions.module').then( m => m.AllTransactionsPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'ajout-user',
    loadChildren: () => import('./pages/ajout-user/ajout-user.module').then( m => m.AjoutUserPageModule)
  },
  {
    path: 'depot-compte',
    loadChildren: () => import('./pages/depot-compte/depot-compte.module').then( m => m.DepotComptePageModule)
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
