import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DateAdapter } from '@angular/material/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { AllLocales, Locale } from '../models';

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  // import Holidays from 'date-holidays';
  // private holidays = new Holidays('BE', 'VLG');

  locale$: BehaviorSubject<Locale> = new BehaviorSubject({
    id: navigator.language,
    name: '',
  });
  allLocales!: AllLocales;

  constructor(private dateAdapter: DateAdapter<Moment>, http: HttpClient) {
    http
      .get('assets/locales.json', { responseType: 'json' })
      .pipe(take(1))
      .subscribe((response) => {
        this.allLocales = <AllLocales>response;
        this.setLocale(
          this.allLocales[navigator.language] ?? this.allLocales['en']
        );
      });
  }

  setLocale(locale: Locale | string): void {
    if (locale == this.locale$.value) return;
    if (typeof locale === 'string') locale = this.allLocales[locale];
    moment.locale(locale.id);
    this.dateAdapter.setLocale(locale.id);
    this.locale$.next(locale);
  }

  get localeId(): string {
    return this.locale$.value.id;
  }

  get dateAdapterLocale$(): Observable<void> {
    return this.dateAdapter.localeChanges;
  }

  getMonthYear(date: Moment): string {
    return date
      .locale(false)
      .format(MAT_MOMENT_DATE_FORMATS.display.monthYearA11yLabel);
    // return this.dateAdapter.format(
    //   date,
    //   MAT_MOMENT_DATE_FORMATS.display.monthYearA11yLabel
    // );
  }
}
