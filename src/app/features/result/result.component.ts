import { Component, OnInit } from '@angular/core';
import { PlannerParamsService } from './services';

@Component({
  selector: 'result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  startDate: Date;
  endDate: Date;

  months: Date[] = [];

  constructor(plannerParamsService: PlannerParamsService) {
    this.startDate = new Date(plannerParamsService.params.start);
    this.endDate = new Date(plannerParamsService.params.end);
  }

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
