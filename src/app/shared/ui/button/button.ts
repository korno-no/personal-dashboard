import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css'
})
export class Button {
  @Input() type: string = '';
  @Input() label: string = '';
  @Input() disabled: boolean = false;
}
