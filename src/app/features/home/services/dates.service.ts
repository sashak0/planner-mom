import { Injectable } from '@angular/core';
import { LocaleService } from '@app/core';

@Injectable({
  providedIn: 'root',
})
export class DatesService {
  constructor(private localeService: LocaleService) {}

  getDatesInMonth(month: number, year: number): Date[] {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  getDaysOfTheFirstWeek(date: Date): Date[] {
    const firstDay = this.localeService.getFirstDayOfWeek();

    date = new Date(date.getFullYear(), date.getMonth(), 1);
    date.setDate(date.getDate() - date.getDay() + firstDay);
    var week = [];
    for (var i = 0; i < 7; i++) {
      week.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return week;
  }
}
