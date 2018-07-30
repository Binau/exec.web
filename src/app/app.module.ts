
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import {AppComponent} from './page/app/app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRouteSubmodule} from './app.route.submodule';

import { BarreNavigationComponent } from './component/barre-navigation/barre-navigation.component';

import {AccueilComponent} from './component/accueil/accueil.component';

import {CommonModule} from './module/common/common.module';
import {ExecModule} from './module/exec/exec.module';
import {FormationsModule} from './module/formations/formations.module';
import {UtilisateurModule} from './module/utilisateur/utilisateur.module';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    BarreNavigationComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    // Routing
    AppRouteSubmodule,
    // Module en commun
    CommonModule,
    // Module pour les tests
    ExecModule,
    FormationsModule,
    UtilisateurModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
