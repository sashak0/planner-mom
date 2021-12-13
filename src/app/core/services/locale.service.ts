import { Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
// import Holidays from 'date-holidays';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { allLocales, Locale } from '../models';

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  // private holidays = new Holidays('BE', 'VLG');

  locale: Locale;

  dayNames$: BehaviorSubject<string[]> = new BehaviorSubject(<string[]>[]);
  monthNames$: BehaviorSubject<string[]> = new BehaviorSubject(<string[]>[]);

  constructor(private dateAdapter: DateAdapter<Date>) {
    this.locale = allLocales[navigator.language] ?? allLocales['en'];
  }

  setLocale(locale: Locale | string): void {
    if (locale == this.locale) return;
    if (typeof locale === 'string') locale = allLocales[locale];
    this.locale = locale;
    this.dateAdapter.setLocale(locale.id);
    this.dayNames$.next(this.getDayOfWeekNames('short'));
    this.monthNames$.next(moment.localeData(locale.id).months());
  }

  getFirstDayOfWeek(): number {
    return this.dateAdapter.getFirstDayOfWeek();
  }

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    const firstDay = this.getFirstDayOfWeek();
    let dayOfWeekNames = this.dateAdapter.getDayOfWeekNames(style);
    if (firstDay == 0) return dayOfWeekNames;
    return [
      ...dayOfWeekNames.slice(firstDay),
      ...dayOfWeekNames.slice(0, firstDay),
    ];
  }
}
