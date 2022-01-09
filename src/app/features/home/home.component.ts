import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Locale, LocaleService } from '@app/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HomeForm } from './models';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewChecked {
  form: FormGroup;
  locales$: Observable<Locale[]>;
  months$: BehaviorSubject<Date[]> = new BehaviorSubject(<Date[]>[]);
  print: boolean = false;

  previewDate = new Date();

  constructor(
    private changeDetector: ChangeDetectorRef,
    private localeService: LocaleService,
    builder: FormBuilder
  ) {
    var formInit: HomeForm = {
      locale: localeService.locale$.value.id,
      start: undefined,
      end: undefined,
    };
    this.form = builder.group(formInit);

    this.locales$ = this.form.get('locale')!.valueChanges.pipe(
      map((input) => {
        if (input.length < 1) return [];
        return Object.values(this.localeService.allLocales).filter((locale) =>
          this.isMatch(input, locale)
        );
      })
    );
  }

  ngAfterViewChecked(): void {
    if (this.print) {
      window.print();
      this.print = false;
    }
  }

  private submittedFormValue?: HomeForm;
  onSubmit(): void {
    const formValue = <HomeForm>this.form.value;
    if (this.submittedFormValue != formValue) {
      this.setLocale(formValue.locale);
      var _months = [];
      var date = new Date(formValue.start!);
      var end = formValue.end!;

      while (date < end) {
        _months.push(date);
        date = new Date(date);
        date.setMonth(date.getMonth() + 1);
      }

      this.months$.next(_months);

      this.changeDetector.detectChanges();

      this.submittedFormValue = this.form.value;
    }
    this.print = true;
  }

  setLocale(locale: Locale | string) {
    this.localeService.setLocale(locale);
  }

  private isMatch(input: string, locale: Locale): boolean {
    return input
      .toLowerCase()
      .split(' ')
      .every(
        (inputPart) =>
          locale.id.toLowerCase().includes(inputPart) ||
          locale.name.toLowerCase().includes(inputPart) ||
          locale.local?.toLowerCase().includes(inputPart)
      );
  }
}
