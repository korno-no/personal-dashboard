import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocus {
  @Input() set appAutoFocus(condition: boolean){
    if(condition)
    setTimeout(() => this.el.nativeElement.focus())
  }
  constructor(private el: ElementRef){}
}
