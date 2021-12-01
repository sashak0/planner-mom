import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { PlannerParamsService } from '../services';

@Directive({
  selector: '[pageFormat]',
})
export class PageFormatDirective {
  constructor(
    renderer: Renderer2,
    hostElement: ElementRef,
    plannerParamsService: PlannerParamsService
  ) {
    renderer.addClass(
      hostElement.nativeElement,
      'page-format-' + plannerParamsService.params.pageFormat
    );
    renderer.addClass(
      hostElement.nativeElement,
      plannerParamsService.params.pageOrientation
    );
  }
}
