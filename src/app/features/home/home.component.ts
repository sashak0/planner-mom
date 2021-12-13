import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocaleService } from '@app/core';
import { ILocale } from 'locale-codes';
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
  locales$: Observable<ILocale[]>;
  months$: BehaviorSubject<Date[]> = new BehaviorSubject(<Date[]>[]);
  print: boolean = false;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private localeService: LocaleService,
    builder: FormBuilder
  ) {
    var formInit: HomeForm = {
      locale: localeService.locale.iLocale.tag,
      start: undefined,
      end: undefined,
    };
    this.form = builder.group(formInit);

    this.locales$ = this.form.get('locale')!.valueChanges.pipe(
      map((input) => {
        if (input.length < 1) return [];
        return Array.from(this.localeService.allLocales.values())
          .filter((locale) => this.isMatch(input, locale.iLocale))
          .map((locale) => locale.iLocale);
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
    if (this.submittedFormValue != <HomeForm>this.form.value) {
      this.setLocale(this.form.value.locale);
      var _months = [];
      var date = new Date(this.form.value.start);
      var end = this.form.value.end;

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

  setLocale(locale: string) {
    this.localeService.setLocale(locale);
  }

  private isMatch(input: string, iLocale: ILocale): boolean {
    return input
      .toLowerCase()
      .split(' ')
      .every(
        (inputPart) =>
          iLocale.tag.toLowerCase().includes(inputPart) ||
          iLocale.name.toLowerCase().includes(inputPart) ||
          iLocale.lcid.toString().toLowerCase().includes(inputPart) ||
          iLocale.location?.toLowerCase().includes(inputPart) ||
          iLocale.local?.toLowerCase().includes(inputPart) ||
          iLocale['iso639-1']?.toLowerCase().includes(inputPart) ||
          iLocale['iso639-2']?.toLowerCase().includes(inputPart)
      );
  }
}
