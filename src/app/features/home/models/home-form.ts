import { Moment } from 'moment';

export interface HomeForm {
  locale: string;
  start?: Moment;
  end?: Moment;
}
