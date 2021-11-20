import { Component, Input, OnInit } from '@angular/core';
import { DatesService } from '../../services';

@Component({
  selector: 'month-days-list',
  templateUrl: './month-days-list.component.html',
  styleUrls: ['./month-days-list.component.scss'],
})
export class MonthDaysListComponent implements OnInit {
  @Input() date: Date = new Date();

  dates: Date[] = [];

  constructor(private datesService: DatesService) {}

  ngOnInit(): void {
    this.dates = this.datesService.getDatesInMonth(
      this.date.getMonth(),
      this.date.getFullYear()
    );
  }
}
