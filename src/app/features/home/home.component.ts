import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { DatesService, LocaleService } from './services';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [LocaleService, DatesService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewChecked {
  form: FormGroup;
  months$: BehaviorSubject<Date[]> = new BehaviorSubject(<Date[]>[]);
  print: boolean = false;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private localeService: LocaleService,
    builder: FormBuilder
  ) {
    this.form = builder.group({
      locale: localeService.locale,
      start: null,
      end: null,
    });

    this.form.get('locale')?.valueChanges.subscribe((locale) => {
      this.localeService.setLocale(locale);
      this.changeDetector.detectChanges();
    });
  }

  ngAfterViewChecked(): void {
    if (this.print) {
      window.print();
      this.print = false;
    }
  }

  onSubmit(): void {
    var _months = [];
    var date = new Date(this.form.value.start);
    var end = this.form.value.end;

    while (date < end) {
      _months.push(date);
      date = new Date(date);
      date.setMonth(date.getMonth() + 1);
    }

    if (JSON.stringify(this.months$.value) != JSON.stringify(_months))
      this.months$.next(_months);

    this.changeDetector.detectChanges();
    this.print = true;
  }
}
