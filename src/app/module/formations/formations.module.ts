import {NgModule} from '@angular/core';
import {CommonModule as ngCommonModule} from '@angular/common';
import {CommonModule} from '../common/common.module';
import {VignetteFormationComponent} from './component/vignette-formation/vignette-formation.component';
import {ExerciceComponent} from './component/exercice/exercice.component';
import {ContenuCycleFormationComponent} from './component/contenu-cycle-formation/contenu-cycle-formation.component';
import {RechercheCycleFormationComponent} from './component/recherche-cycle-formation/recherche-cycle-formation.component';
import {CycleFormationComponent} from './component/cycle-formation/cycle-formation.component';
import {FormationComponent} from './component/formation/formation.component';

import {FormationRouteSubmodule} from './formation-route-submodule.module';

@NgModule({
  imports: [
    // Angular
    ngCommonModule,
    CommonModule,

    // Routing
    FormationRouteSubmodule,

  ],
  exports: [],
  declarations: [
    VignetteFormationComponent,
    ExerciceComponent,
    ContenuCycleFormationComponent,
    RechercheCycleFormationComponent,
    CycleFormationComponent,
    FormationComponent
  ]
})

export class FormationsModule { }
