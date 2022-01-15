import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { Moment } from 'moment';
import { DatesService } from '../../services';

@Component({
  selector: 'month-days-list',
  templateUrl: './month-days-list.component.html',
  styleUrls: ['./month-days-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthDaysListComponent implements OnChanges {
  @Input() date!: Moment;

  dates: Moment[] = [];

  constructor(
    private datesService: DatesService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnChanges(): void {
    this.updateDates();
  }

  updateDates(): void {
    this.dates = this.datesService.getDatesInMonth(this.date);
    this.changeDetector.detectChanges();
  }
}
