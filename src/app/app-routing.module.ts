import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'result',
    loadChildren: () =>
      import('./features/result/result.module').then((m) => m.ResultModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/planner-params/planner-params.module').then(
        (m) => m.PlannerParamsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
