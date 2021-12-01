import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PlannerParams } from '@app/shared/models';

@Component({
  selector: 'planner-params',
  templateUrl: './planner-params.component.html',
  styleUrls: ['./planner-params.component.scss'],
})
export class PlannerParamsComponent implements OnInit {
  form: FormGroup;
  isoFormats: string[] = [];

  constructor(private router: Router, builder: FormBuilder) {
    let start = new Date();
    start.setDate(1);

    let end = new Date(start);
    end.setFullYear(end.getFullYear() + 1);

    let params: PlannerParams = {
      pageFormat: 'a5',
      pageOrientation: 'portrait',
      start: start,
      end: end,
    };

    this.form = builder.group(params);

    for (let type of ['a', 'b', 'c'])
      for (let number of [5, 6]) this.isoFormats.push(type + number);
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.form.value.start = this.formatDate(this.form.value.start);
    this.form.value.end = this.formatDate(this.form.value.end);
    this.router.navigate(['result'], {
      queryParams: this.form.value,
    });
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
