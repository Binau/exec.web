import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreationUtilisateurComponent } from './component/creation-utilisateur/creation-utilisateur.component';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [
  { path: 'creation-utilisateur', component: CreationUtilisateurComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UtilisateurRouteSubmodule { }
