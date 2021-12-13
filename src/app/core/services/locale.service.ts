import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
// import Holidays from 'date-holidays';
import * as moment from 'moment';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AllLocales, Locale } from '../models';

@Injectable({
  providedIn: 'root',
})
export class LocaleService implements OnDestroy {
  // private holidays = new Holidays('BE', 'VLG');

  locale: Locale = {
    id: navigator.language,
    name: '',
  };
  allLocales!: AllLocales;

  dayNames$: BehaviorSubject<string[]> = new BehaviorSubject(<string[]>[]);
  monthNames$: BehaviorSubject<string[]> = new BehaviorSubject(<string[]>[]);

  private sub: Subscription;

  constructor(private dateAdapter: DateAdapter<Date>, http: HttpClient) {
    this.sub = http
      .get('assets/locales.json', { responseType: 'json' })
      .subscribe((response) => {
        this.allLocales = <AllLocales>response;
        this.locale =
          this.allLocales[navigator.language] ?? this.allLocales['en'];
      });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  setLocale(locale: Locale | string): void {
    if (locale == this.locale) return;
    if (typeof locale === 'string') locale = this.allLocales[locale];
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
