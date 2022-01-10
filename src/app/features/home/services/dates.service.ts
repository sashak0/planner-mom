import { Injectable } from '@angular/core';
import { Moment } from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DatesService {
  constructor() {}

  getDatesInMonth(inputMoment: Moment): Moment[] {
    var date = inputMoment.clone().locale(false).startOf('month');
    var days: Moment[] = [];
    while (date.month() === inputMoment.month()) {
      days.push(date.clone());
      date.add(1, 'days');
    }
    return days;
  }

  getWeeks(inputMoment: Moment): Moment[][] {
    const date = inputMoment
      .clone()
      .locale(false)
      .startOf('month')
      .startOf('week');

    const end = inputMoment.clone().locale(false).endOf('month').endOf('week');

    var weeks = [];
    for (var iWeek = 0; date <= end; iWeek++) {
      var week = [];
      for (var iDay = 0; iDay < 7; iDay++) {
        week.push(date.clone());
        date.add(1, 'days');
      }
      weeks.push(week);
    }

    return weeks;
  }
}
