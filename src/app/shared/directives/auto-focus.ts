import { Directive, ElementRef, Input, SimpleChanges, OnChanges } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class appAutoFocus implements OnChanges{
  @Input() appAutoFocus: boolean = false;
  constructor(private el: ElementRef){}

  ngOnChanges(changes: SimpleChanges){
    if (changes['appAutoFocus']) {
      if (this.appAutoFocus) {
        queueMicrotask(() => this.el.nativeElement.focus());
      } else {
        this.el.nativeElement.blur();
      }
    }
  }

}
