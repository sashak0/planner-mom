import { Component, Input, OnInit } from '@angular/core';
import { LocaleService } from '@app/core';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'calendar-lines',
  templateUrl: './calendar-lines.component.html',
  styleUrls: ['./calendar-lines.component.scss'],
})
export class CalendarLinesComponent implements OnInit {
  @Input() date!: Date;
  monthName$ = this.localeService.monthNames$.pipe(
    map((months) => months[this.date.getMonth()])
  );

  constructor(private localeService: LocaleService) {}

  ngOnInit(): void {}
}
