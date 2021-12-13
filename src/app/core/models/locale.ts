export interface Locale {
  id: string;
  name: string;
  local?: string;
}

export interface AllLocales {
  [id: string]: Locale;
}
