import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AccueilComponent} from './page/accueil/accueil.component';

const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouteSubmodule { }
