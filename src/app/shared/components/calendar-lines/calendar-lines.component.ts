import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'calendar-lines',
  templateUrl: './calendar-lines.component.html',
  styleUrls: ['./calendar-lines.component.scss'],
})
export class CalendarLinesComponent implements OnInit {
  @Input() date!: Date;

  constructor() {}

  ngOnInit(): void {}
}
