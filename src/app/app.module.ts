import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './component/app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRouteSubmodule} from './app.route.submodule';
import { TestsComponent } from './component/tests/tests.component';
import { TestComponent } from './component/test/test.component';

import { VignetteFormationComponent } from './component/vignette-formation/vignette-formation.component';
import { ExerciceComponent } from './component/exercice/exercice.component';
import { ContenuCycleFormationComponent } from './component/contenu-cycle-formation/contenu-cycle-formation.component';
import { RechercheCycleFormationComponent } from './component/recherche-cycle-formation/recherche-cycle-formation.component';
import { AccueilComponent } from './component/accueil/accueil.component';
import { CycleFormationComponent } from './component/cycle-formation/cycle-formation.component';


@NgModule({
  declarations: [
    AppComponent,
    TestsComponent,
    TestComponent,
    VignetteFormationComponent,
    ExerciceComponent,
    ContenuCycleFormationComponent,
    RechercheCycleFormationComponent,
    AccueilComponent,
    CycleFormationComponent
  ],
  imports: [
    // Angular
    BrowserModule,
    BrowserAnimationsModule,
    // Routing
    AppRouteSubmodule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }