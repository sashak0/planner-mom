import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlannerParams } from '@app/shared/models';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlannerParamsService implements OnDestroy {
  params!: PlannerParams;

  private queryParamsSubscription: Subscription;

  constructor(activatedRoute: ActivatedRoute) {
    this.queryParamsSubscription = activatedRoute.queryParams.subscribe((p) => {
      this.params = <PlannerParams>p;
    });
  }
  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }
}
