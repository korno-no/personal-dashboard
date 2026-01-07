import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from '../button/button';

@Component({
  selector: 'app-modal',
  imports: [FormsModule, Button],
  templateUrl: './modal.html',
  styleUrl: './modal.css'
})
export class Modal {
  @Input() label = ''; 
  @Output() saveValue = new EventEmitter<string>();
  @Output() close = new EventEmitter();
  inputValue = ''

  onSave(){
    this.saveValue.emit(this.inputValue);
    this.close.emit();
  }
  onCancel(){
    this.close.emit();
  }

  onBackdropClick(){
    this.close.emit();
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    this.close.emit();
  }
}
