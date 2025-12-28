import { Component } from '@angular/core';
import { Button } from "../../shared/ui/button/button";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { WeekSelector } from "./week-selector/week-selector";

@Component({
  selector: 'app-habits',
  imports: [Button, ReactiveFormsModule, WeekSelector],
  templateUrl: './habits.html',
  styleUrl: './habits.css'
})
export class Habits {

  onWeekChange(firstDayOfWeek: Date) {
    console.log("Selected week starting on: ", firstDayOfWeek);
  }

  newHabit = new FormControl('');

  addHabit() {
    
  }
}
