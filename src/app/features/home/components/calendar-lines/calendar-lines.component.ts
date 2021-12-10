import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { DatesService } from '../../services';

@Component({
  selector: 'calendar-lines',
  templateUrl: './calendar-lines.component.html',
  styleUrls: ['./calendar-lines.component.scss'],
})
export class CalendarLinesComponent implements OnInit {
  @Input() date!: Date;
  monthName$ = this.datesService.monthNames$.pipe(
    map((months) => months[this.date.getMonth()])
  );

  constructor(private datesService: DatesService) {}

  ngOnInit(): void {}
}
