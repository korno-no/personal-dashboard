import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from "../../../shared/ui/button/button";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-week-selector',
  imports: [Button, CommonModule],
  templateUrl: './week-selector.html',
  styleUrl: './week-selector.css'
})
export class WeekSelector {
  @Input() firstDayOfWeek: number = 0; // 1 = Monday, 0 = Sunday
  @Output() weekChange = new EventEmitter();

  selectedWeekFirstDay: Date = this.findFirstDayOfWeek(this.firstDayOfWeek);

  // Calculate the first day of the current week based on the provided start day
  findFirstDayOfWeek(StartOfWeek: number): Date {
    let mDifference = new Date().getDay() - StartOfWeek;
    if (mDifference < 0) {
        mDifference += 7;
    }
    let firstDayOfWeek = new Date();
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() + mDifference * -1);
    return firstDayOfWeek;
  }

  // Handle week change based on user interaction
  onWeekChange(operation: string){
    const current = new Date(this.selectedWeekFirstDay);
    if(operation === '+'){
      current.setDate(current.getDate() + 7);
    }
    else if(operation === '-'){
      current.setDate(current.getDate() - 7);
    }
    this.weekChange.emit(current);
    this.selectedWeekFirstDay = current;
  }
}
