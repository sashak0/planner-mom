import { Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';

@Injectable()
export class LocaleService {
  locale: string = navigator.language;

  constructor(private dateAdapter: DateAdapter<Date>) {}

  setLocale(locale: string): void {
    this.locale = locale;
    this.dateAdapter.setLocale(locale);
  }
}
