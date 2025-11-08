import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  imports: [],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css'
})
export class Dropdown {

  @Input() values: string[] = [];
  @Input() label: string = '';
  @Input() selected: string = '';
  @Output() newSelected = new EventEmitter<string>()
  open = false

  constructor(private eRef: ElementRef) {}


  onSelect(value: string){
    this.selected = value
    this.newSelected.emit(value)
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.open = false;
    }
  }
}
