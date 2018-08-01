import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RechercheCycleFormationComponent } from './component/recherche-cycle-formation/recherche-cycle-formation.component';
import {ContenuCycleFormationComponent} from './component/contenu-cycle-formation/contenu-cycle-formation.component';
import {VignetteFormationComponent} from './component/vignette-formation/vignette-formation.component';
import {FormationComponent} from './component/formation/formation.component';

const routes: Routes = [
  { path: 'recherche-cycle-formation', component: RechercheCycleFormationComponent },
  { path: 'contenu-cycle-formation/:id', component: ContenuCycleFormationComponent },
  { path: 'cycle-formation/:id', component: VignetteFormationComponent },
  { path: 'formation/:id', component: FormationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormationRouteSubmodule { }