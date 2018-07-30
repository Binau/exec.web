import { NgModule } from '@angular/core';
import {CommonModule as ngCommonModule} from '@angular/common';
import {CommonModule} from '../common/common.module';

import { CreationUtilisateurComponent } from './component/creation-utilisateur/creation-utilisateur.component';
import { LoginComponent } from './component/login/login.component';
import {UtilisateurRouteSubmodule} from './utilisateur-route-submodule.module';

@NgModule({
  imports: [
    ngCommonModule,
    CommonModule,

    // Routing
    UtilisateurRouteSubmodule
  ],
  declarations: [CreationUtilisateurComponent, LoginComponent]
})
export class UtilisateurModule { }
