import {
  Component,
  Input,
  forwardRef
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.html',
  styleUrl: './input.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {

  @Input() placeholder = '';
  @Input() id = '';
  @Input() label = '';
  @Input() type = ''; // text | textarea | checkbox
  @Input() name = '';

  value: any = '';
  checked: boolean = false;

  disabled = false;

  // callbacks
  private onChange = (value: any) => {};
  private _onTouched = () => {};

  onTouched() {
    this._onTouched(); 
  }

  // Angular writes value → UI
  writeValue(value: any): void {
    if (this.type === 'checkbox') {
      this.checked = !!value;
    } else {
      this.value = value ?? '';
    }
  }

  // Angular registers change fn
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Angular registers touched fn
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // disabled state
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // UI → Angular
  onInput(event: Event) {
    const target = event.target as HTMLInputElement;

    if (this.type === 'checkbox') {
      this.checked = target.checked;
      this.onChange(this.checked);
    } else {
      this.value = target.value;
      this.onChange(this.value);
    }

    this.onTouched();
  }
}
