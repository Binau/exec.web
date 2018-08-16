import { NgModule } from '@angular/core';
import {CommonModule} from '../common/common.module';
import {ExecRouteSubmodule} from './exec-route-submodule.module';
import {TestComponent} from './component/test/test.component';
import {TestsComponent} from './page/tests/tests.component';
import { ExecComponent } from './component/exec/exec.component';
import {ExecSvgComponent} from './component/exec-svg/exec-svg.component';
import {DemoExecComponent} from './page/demo/demo-exec.component';

@NgModule({
  imports: [
    CommonModule,

    // Routing
    ExecRouteSubmodule,

    //
  ],
  declarations: [
    TestComponent,
    ExecComponent,
    TestsComponent,
    ExecSvgComponent,
    DemoExecComponent
  ],

})
export class ExecModule { }
