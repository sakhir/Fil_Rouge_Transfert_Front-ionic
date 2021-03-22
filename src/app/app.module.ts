import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule  } from '@angular/common/http';
import { AuthModule} from  './auth/auth.module'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterPage } from './pages/footer/footer.page';
import { InterceptorProvider } from 'src/_helpers/auth.interceptor';
import { AuthentificationService } from './services/authentification.service';
import { ConnexionGuard } from './guards/connexion.guard';
import { LoginGuard } from './guards/login.guard';



@NgModule({
  declarations: [AppComponent,FooterPage],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule ,AuthModule ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, InterceptorProvider ,AuthentificationService ,ConnexionGuard ,LoginGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
