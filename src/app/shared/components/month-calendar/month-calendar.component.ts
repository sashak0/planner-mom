import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { DatesService } from '../../services';

@Component({
  selector: 'month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthCalendarComponent implements OnInit {
  @Input() date: Date = new Date();

  month!: number;

  weeks: Date[][] = [];

  constructor(private datesService: DatesService) {}

  ngOnInit(): void {
    this.month = this.date.getMonth();
    var firstWeek = this.datesService.getDaysOfTheFirstWeek(this.date);
    let dates: Date[] = [];

    for (var i = 0; firstWeek[i].getMonth() != this.month; i++)
      dates = [...dates, firstWeek[i]];

    dates = [
      ...dates,
      ...this.datesService.getDatesInMonth(
        this.date.getMonth(),
        this.date.getFullYear()
      ),
    ];

    while (dates.length > 7) {
      this.weeks.push(dates.slice(0, 7));
      dates = dates.slice(7);
    }
    this.weeks.push(dates);
  }
}
