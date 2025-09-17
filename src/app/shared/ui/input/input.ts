import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.css'
})
export class InputComponent {

  @Input() placeholder = '';
  @Input() type = '';
  @Input() value = '';
  @Input() name = ''
  @Output() valueChange = new EventEmitter<string>()

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  }
}
