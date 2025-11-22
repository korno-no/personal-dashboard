import { Component } from '@angular/core';
import { Button } from "../../shared/ui/button/button";
import { InputComponent } from "../../shared/ui/input/input";
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-habits',
  imports: [Button, InputComponent, ReactiveFormsModule],
  templateUrl: './habits.html',
  styleUrl: './habits.css'
})
export class Habits {
  newHabit = new FormControl('');

  addHabit() {
    
  }
}
