import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'year-calendar-page',
  templateUrl: './year-calendar-page.component.html',
  styleUrls: ['./year-calendar-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YearCalendarPageComponent implements OnChanges {
  @Input() date!: Moment;
  @Input() set year(year: number) {
    this.date = moment().year(year).startOf('year');
  }

  // TODO implement sizing
  @Input() monthsPerPage: 12 | 6 | 1 = 6;

  pages!: Moment[][];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.generateMonths();
  }

  generateMonths(): void {
    let monthDate = this.date.clone().startOf('year');
    let months = [];
    while (monthDate.year() == this.date.year()) {
      months.push(monthDate.clone());
      monthDate.add(1, 'months');
    }

    this.pages = [];
    while (months.length > 0) {
      this.pages.push(months.splice(0, this.monthsPerPage));
    }
  }
}
