import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[pageFormat]',
})
export class PageFormatDirective {
  constructor(private renderer: Renderer2, hostElement: ElementRef) {
    renderer.addClass(hostElement.nativeElement, 'page-format-a4');
  }
}
