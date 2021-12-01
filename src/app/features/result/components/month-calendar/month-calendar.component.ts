import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DatesService } from '../../services';

@Component({
  selector: 'month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthCalendarComponent implements OnChanges {
  @Input() date!: Date;

  month!: number;

  weeks: Date[][] = [];

  constructor(private datesService: DatesService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['date']) this.dateChanged();
  }

  private dateChanged(): void {
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

    this.weeks = [];

    while (dates.length > 7) {
      this.weeks.push(dates.slice(0, 7));
      dates = dates.slice(7);
    }
    this.weeks.push(dates);
  }
}
