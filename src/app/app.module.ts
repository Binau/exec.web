import {NgModule} from '@angular/core';

import {AppComponent} from './page/app/app.component';
import {AppRouteSubmodule} from './app.route.submodule';

import {BarreNavigationComponent} from './component/barre-navigation/barre-navigation.component';

import {AccueilComponent} from './page/accueil/accueil.component';

import {CommonModule} from './module/common/common.module';
import {ExecModule} from './module/exec/exec.module';
import {FormationsModule} from './module/formations/formations.module';
import {UtilisateurModule} from './module/utilisateur/utilisateur.module';
import {environment} from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    BarreNavigationComponent,
  ],
  imports: [
    // Routing
    AppRouteSubmodule,
    // Module en commun
    CommonModule,

    // Module pour les tests
    ExecModule,

    // Autres
    FormationsModule,
    UtilisateurModule
  ],
  providers: [
    environment.envProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
