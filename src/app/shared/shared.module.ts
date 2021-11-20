import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CalendarLinesComponent,
  MonthCalendarComponent,
  MonthDaysListComponent,
} from './components';
import { PageFormatDirective } from './directives';

var directives = [PageFormatDirective];

var components = [
  MonthDaysListComponent,
  CalendarLinesComponent,
  MonthCalendarComponent,
];

@NgModule({
  declarations: [...directives, ...components],
  imports: [CommonModule],
  exports: [CommonModule, ...directives, ...components],
})
export class SharedModule {}
