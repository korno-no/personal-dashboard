import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css'
})
export class Button {
  @Input() theme: string = '';
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Output() clicked = new EventEmitter<void>()
}
