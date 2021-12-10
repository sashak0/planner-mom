import { CommonModule, registerLocaleData } from '@angular/common';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';
import {
  CalendarLinesComponent,
  MonthCalendarComponent,
  MonthDaysListComponent,
} from './components';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DateLocalPipe } from './pipes';

var formModules = [FormsModule, ReactiveFormsModule, MatFormFieldModule];
var matModules = [
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonModule,
  MatCardModule,
  MatSelectModule,
];
var components = [
  HomeComponent,
  MonthDaysListComponent,
  CalendarLinesComponent,
  MonthCalendarComponent,
];

@NgModule({
  declarations: [...components, DateLocalPipe],
  imports: [
    CommonModule,
    TranslocoModule,
    HomeRoutingModule,
    ...formModules,
    ...matModules,
  ],
  providers: [],
})
export class HomeModule {}
