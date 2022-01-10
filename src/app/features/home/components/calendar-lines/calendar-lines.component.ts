import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { LocaleService } from '@app/core';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'calendar-lines',
  templateUrl: './calendar-lines.component.html',
  styleUrls: ['./calendar-lines.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarLinesComponent implements OnChanges {
  @Input() date!: Moment;
  monthYear$!: Observable<string>;

  constructor(private localeService: LocaleService) {}

  ngOnChanges(): void {
    this.monthYear$ = this.localeService.locale$.pipe(
      map(() => this.localeService.getMonthYear(this.date))
    );
  }
}
