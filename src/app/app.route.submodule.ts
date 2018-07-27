import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RechercheCycleFormationComponent } from './component/recherche-cycle-formation/recherche-cycle-formation.component';
import {AccueilComponent} from './component/accueil/accueil.component';
import {ContenuCycleFormationComponent} from './component/contenu-cycle-formation/contenu-cycle-formation.component';
import {VignetteFormationComponent} from './component/vignette-formation/vignette-formation.component';
import {FormationComponent} from './component/formation/formation.component';
import {CreationUtilisateurComponent} from './component/creation-utilisateur/creation-utilisateur.component'
import {LoginComponent} from './component/login/login.component'

const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  { path: 'recherche-cycle-formation', component: RechercheCycleFormationComponent },
  { path: 'contenu-cycle-formation/:id', component: ContenuCycleFormationComponent },
  { path: 'cycle-formation/:id', component: VignetteFormationComponent },
  { path: 'formation/:id', component: FormationComponent },
  { path: 'creation-utilisateur', component: CreationUtilisateurComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouteSubmodule { }
