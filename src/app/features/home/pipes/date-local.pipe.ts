import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { LocaleService } from '../services';

@Pipe({
  name: 'dateLocal',
})
export class DateLocalPipe implements PipeTransform {
  constructor(private localeService: LocaleService) {}

  transform(value: Date, format: string): string {
    return value.toLocaleDateString();
  }
}
