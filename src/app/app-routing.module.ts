import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ConnexionGuard } from './guards/connexion.guard'
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate:[LoginGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate:[LoginGuard] 
  },
  {
    path: 'agence',
    loadChildren: () => import('./pages/agence/agence.module').then( m => m.AgencePageModule), 
    canActivate:[ConnexionGuard]
  },
  {
    path: 'header-transaction',
    loadChildren: () => import('./pages/header-transaction/header-transaction.module').then( m => m.HeaderTransactionPageModule) ,
    canActivate:[ConnexionGuard]
  },
  {
    path: 'depot',
    loadChildren: () => import('./pages/depot/depot.module').then( m => m.DepotPageModule) ,
    canActivate:[ConnexionGuard]
  },
  {
    path: 'footer',
    loadChildren: () => import('./pages/footer/footer.module').then( m => m.FooterPageModule)
  },
  {
    path: 'retrait',
    loadChildren: () => import('./pages/retrait/retrait.module').then( m => m.RetraitPageModule) ,
    canActivate:[ConnexionGuard]
  },
  {
    path: 'calcul',
    loadChildren: () => import('./pages/calcul/calcul.module').then( m => m.CalculPageModule),
    canActivate:[ConnexionGuard]
  },
  {
    path: 'commission',
    loadChildren: () => import('./pages/commission/commission.module').then( m => m.CommissionPageModule),
    canActivate:[ConnexionGuard]
  },
  {
    path: 'mtransactions',
    loadChildren: () => import('./pages/mtransactions/mtransactions.module').then( m => m.MtransactionsPageModule),
    canActivate:[ConnexionGuard]
  },
  {
    path: 'all-transactions',
    loadChildren: () => import('./pages/all-transactions/all-transactions.module').then( m => m.AllTransactionsPageModule),
    canActivate:[ConnexionGuard]
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule),
    canActivate:[ConnexionGuard]
  },
  {
    path: 'ajout-user',
    loadChildren: () => import('./pages/ajout-user/ajout-user.module').then( m => m.AjoutUserPageModule),
    canActivate:[ConnexionGuard]
  },
  {
    path: 'depot-compte',
    loadChildren: () => import('./pages/depot-compte/depot-compte.module').then( m => m.DepotComptePageModule),
    canActivate:[ConnexionGuard]
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
