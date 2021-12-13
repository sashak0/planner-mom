import { Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
// import Holidays from 'date-holidays';
/* eslint-disable @typescript-eslint/no-unused-expressions, @typescript-eslint/no-unused-vars */
import * as localeCodes from 'locale-codes';
import { ILocale } from 'locale-codes';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { Locale } from '../models';

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  // private holidays = new Holidays('BE', 'VLG');

  locale: Locale;
  allLocales: Map<string, Locale> = new Map();

  dayNames$: BehaviorSubject<string[]> = new BehaviorSubject(<string[]>[]);
  monthNames$: BehaviorSubject<string[]> = new BehaviorSubject(<string[]>[]);

  constructor(private dateAdapter: DateAdapter<Date>) {
    const defaultLocaleAbbr = this.getAbbr();
    this.locale = this.getLocale(localeCodes.getByTag(defaultLocaleAbbr));

    this.allLocales.set(defaultLocaleAbbr, this.locale);

    localeCodes.all.forEach((il) => {
      // filters out the locales that are not in the moment
      if (
        defaultLocaleAbbr == this.getAbbr(il.tag) &&
        il.name != this.locale.iLocale.name
      )
        return;

      this.allLocales.set(il.tag, this.getLocale(il));
    });
  }

  setLocale(localeTag: string): void {
    if (!this.allLocales.get(localeTag)) return;
    this.locale = this.allLocales.get(localeTag)!;
    this.dateAdapter.setLocale(localeTag);
    this.dayNames$.next(this.getDayOfWeekNames('short'));
    this.monthNames$.next(this.locale.momentLocale.months());
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

  private getLocale(il: ILocale): Locale {
    return {
      iLocale: il,
      momentLocale: moment.localeData(il.tag),
    };
  }

  private getAbbr(locale?: string): string {
    return (<any>moment.localeData(locale))['_abbr'];
  }
}
