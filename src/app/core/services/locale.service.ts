import { Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
// import Holidays from 'date-holidays';
/* eslint-disable @typescript-eslint/no-unused-expressions, @typescript-eslint/no-unused-vars */
import * as localeCodes from 'locale-codes';
import { ILocale } from 'locale-codes';
import * as momentF from 'moment';
import { BehaviorSubject } from 'rxjs';
import { Locale } from '../models';

@Injectable()
export class LocaleService {
  // private holidays = new Holidays('BE', 'VLG');

  locale: Locale;
  allLocales: Map<string, Locale> = new Map();

  dayNames$: BehaviorSubject<string[]> = new BehaviorSubject(
    this.dateAdapter.getDayOfWeekNames('short')
  );
  monthNames$: BehaviorSubject<string[]> = new BehaviorSubject(
    this.dateAdapter.getMonthNames('long')
  );

  constructor(private dateAdapter: DateAdapter<Date>) {
    const defaultLocaleAbbr = this.getAbbr();
    this.locale = this.getLocale(localeCodes.getByTag(defaultLocaleAbbr));

    localeCodes.all.forEach((il) => {
      if (defaultLocaleAbbr == this.getAbbr(il.tag)) return;
      this.allLocales.set(il.tag, this.getLocale(il));
    });
  }

  setLocale(localeTag: string): void {
    if (!this.allLocales.get(localeTag)) return;
    this.locale = this.allLocales.get(localeTag)!;
    this.dateAdapter.setLocale(localeTag);
    this.dayNames$.next(this.locale.momentLocale.weekdaysShort());
    this.monthNames$.next(this.locale.momentLocale.months());
  }

  private getLocale(il: ILocale): Locale {
    return {
      iLocale: il,
      momentLocale: momentF.localeData(il.tag),
    };
  }

  private getAbbr(locale?: string): string {
    return (<any>momentF.localeData(locale))['_abbr'];
  }
}
