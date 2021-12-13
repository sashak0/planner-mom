import { ILocale } from 'locale-codes';

export interface Locale {
  iLocale: ILocale;
  momentLocale: moment.Locale;
}

export const allLocales = [];
