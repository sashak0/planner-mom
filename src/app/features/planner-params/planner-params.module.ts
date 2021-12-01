import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '@app/shared';
import { InputRoutingModule } from './planner-params-routing.module';
import { PlannerParamsComponent } from './planner-params.component';

var formModules = [FormsModule, ReactiveFormsModule, MatFormFieldModule];
var matModules = [
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
];

@NgModule({
  declarations: [PlannerParamsComponent],
  imports: [SharedModule, InputRoutingModule, ...formModules, ...matModules],
})
export class PlannerParamsModule {}
