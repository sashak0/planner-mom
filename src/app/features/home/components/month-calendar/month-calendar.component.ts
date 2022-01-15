import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Moment } from 'moment';
import { DatesService } from '../../services';

@Component({
  selector: 'month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthCalendarComponent implements OnChanges {
  @Input() date!: Moment;

  month!: number;

  weeks: Moment[][] = [];

  constructor(
    private datesService: DatesService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['date']) this.updateDates();
  }

  private updateDates(): void {
    if (!this.date) return;
    this.month = this.date.month();
    this.weeks = this.datesService.getWeeks(this.date);
    this.changeDetector.detectChanges();
  }
}
