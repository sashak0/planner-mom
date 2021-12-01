import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import {
  CalendarLinesComponent,
  MonthCalendarComponent,
  MonthDaysListComponent,
} from './components';
import { PageFormatDirective } from './directives';
import { ResultRoutingModule } from './result-routing.module';
import { ResultComponent } from './result.component';

var directives = [PageFormatDirective];

var components = [
  ResultComponent,
  MonthDaysListComponent,
  CalendarLinesComponent,
  MonthCalendarComponent,
];

@NgModule({
  declarations: [...directives, ...components],
  imports: [SharedModule, ResultRoutingModule],
})
export class ResultModule {}
