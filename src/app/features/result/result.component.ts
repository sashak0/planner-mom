import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  startDate: Date = new Date();
  endDate: Date = new Date();

  months: Date[] = [];

  constructor() {}

  ngOnInit(): void {
    this.startDate.setDate(1);
    this.endDate.setDate(1);
    this.endDate.setFullYear(this.endDate.getFullYear() + 1);
    var date = new Date(this.startDate);
    while (date < this.endDate) {
      this.months.push(date);
      date = new Date(date);
      date.setMonth(date.getMonth() + 1);
    }
  }
}
