import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.css'
})
export class InputComponent {

  @Input() placeholder = '';
  @Input() label = '';
  @Input() type = '';
  @Input() value: string = '';
  @Input() checked?: boolean;
  @Input() name = '';
  
  @Output() valueChange = new EventEmitter<string>()
  @Output() checkedChange = new EventEmitter<boolean>()

  onInput(event: Event) {
    
    const target = event.target as HTMLInputElement;

    if (this.type === 'checkbox') {
    this.checkedChange.emit(target.checked); // boolean
    } else{
      this.valueChange.emit(target.value);
    }
  }
}
