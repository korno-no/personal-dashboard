import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  onSelect(value: string){
    this.selected = value
    this.newSelected.emit(value)
  }
}
