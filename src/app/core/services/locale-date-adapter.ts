import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import * as momentF from 'moment';

@Injectable()
export class LocaleDateAdapter extends NativeDateAdapter {
  override getFirstDayOfWeek(): number {
    return momentF.localeData(this.locale).firstDayOfWeek();
  }
}
