import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TestsComponent} from './page/tests/tests.component';
import {DemoExecComponent} from './page/demo/demo-exec.component';

const routes: Routes = [
  { path: 'tests', component: TestsComponent },
  { path: 'demo-exec', component: DemoExecComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExecRouteSubmodule { }
