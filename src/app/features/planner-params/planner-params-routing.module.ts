import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlannerParamsComponent } from './planner-params.component';

const routes: Routes = [{ path: '', component: PlannerParamsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InputRoutingModule {}
