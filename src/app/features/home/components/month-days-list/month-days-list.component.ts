import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { LocaleService, UnsubscribeOnDestroy } from '@app/core';
import { Moment } from 'moment';
import { DatesService } from '../../services';

@Component({
  selector: 'month-days-list',
  templateUrl: './month-days-list.component.html',
  styleUrls: ['./month-days-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthDaysListComponent
  extends UnsubscribeOnDestroy
  implements OnChanges
{
  @Input() date!: Moment;

  dates: Moment[] = [];

  constructor(
    localeService: LocaleService,
    private datesService: DatesService,
    private changeDetector: ChangeDetectorRef
  ) {
    super();
    this.subs = localeService.dateAdapterLocale$.subscribe(() =>
      this.updateDates()
    );
  }

  ngOnChanges(): void {
    this.updateDates();
  }

  updateDates(): void {
    this.dates = this.datesService.getDatesInMonth(this.date);
    this.changeDetector.detectChanges();
  }
}
