import { Injectable, OnDestroy } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import Holidays from 'date-holidays';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable()
export class DatesService implements OnDestroy {
  private holidays = new Holidays('BE', 'VLG');
  private subscription: Subscription;

  dayNames$: BehaviorSubject<string[]> = new BehaviorSubject(
    this.dateAdapter.getDayOfWeekNames('short')
  );
  monthNames$: BehaviorSubject<string[]> = new BehaviorSubject(
    this.dateAdapter.getMonthNames('long')
  );

  constructor(private dateAdapter: DateAdapter<Date>) {
    this.subscription = this.dateAdapter.localeChanges.subscribe(() => {
      this.dayNames$.next(this.dateAdapter.getDayOfWeekNames('short'));
      this.monthNames$.next(this.dateAdapter.getMonthNames('long'));
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

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
