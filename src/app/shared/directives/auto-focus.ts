import { Directive, ElementRef, Input, effect, Signal, untracked, ViewChild, afterNextRender} from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class appAutoFocus {

   @Input({ required: true }) appAutoFocus!: Signal<boolean>;

  constructor(private el: ElementRef) {
  }
}
