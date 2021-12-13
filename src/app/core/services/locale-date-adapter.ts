import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import * as moment from 'moment';

@Injectable()
export class LocaleDateAdapter extends NativeDateAdapter {
  override getFirstDayOfWeek(): number {
    return moment.localeData(this.locale).firstDayOfWeek();
  }
}
