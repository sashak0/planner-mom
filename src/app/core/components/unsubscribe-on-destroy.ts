import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  template: '',
})
export abstract class UnsubscribeOnDestroy implements OnDestroy {
  private _subscriptions: Subscription[] = [];

  set subs(subscription: Subscription) {
    this._subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
