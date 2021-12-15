import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';
import {
  CalendarLinesComponent,
  MonthCalendarComponent,
  MonthDaysListComponent,
} from './components';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

var formModules = [FormsModule, ReactiveFormsModule, MatFormFieldModule];
var matModules = [
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonModule,
  MatCardModule,
  MatSelectModule,
  MatInputModule,
  MatAutocompleteModule,
  MatIconModule,
];
var components = [
  HomeComponent,
  MonthDaysListComponent,
  CalendarLinesComponent,
  MonthCalendarComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    TranslocoModule,
    HomeRoutingModule,
    ...formModules,
    ...matModules,
  ],
})
export class HomeModule {}
