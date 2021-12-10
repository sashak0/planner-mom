import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewChecked {
  form: FormGroup;
  monthsSubject: BehaviorSubject<Date[]> = new BehaviorSubject(<Date[]>[]);
  months$ = this.monthsSubject.asObservable();
  print: boolean = false;

  constructor(private changeDetector: ChangeDetectorRef, builder: FormBuilder) {
    this.form = builder.group({
      start: null,
      end: null,
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

    if (JSON.stringify(this.monthsSubject.value) != JSON.stringify(_months)) {
      this.monthsSubject.next(_months);
      this.changeDetector.detectChanges();
    }

    this.print = true;
  }
}
