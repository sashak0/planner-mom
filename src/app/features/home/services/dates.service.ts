import { Injectable } from '@angular/core';
import Holidays from 'date-holidays';

@Injectable({
  providedIn: 'root',
})
export class DatesService {
  private holidays = new Holidays('BE', 'VLG');

  constructor() {}

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
    date = new Date(date.getFullYear(), date.getMonth(), 1);
    date.setDate(date.getDate() - date.getDay() + 1);
    var week = [];
    for (var i = 0; i < 7; i++) {
      week.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return week;
  }
}
