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

  startDate!: Date;

  ngOnInit() {
    this.startDate = this.findStartDateOfWeek(this.firstDayOfWeek);
    this.weekChange.emit(this.startDate); 
  }

  // Calculate the first day of the current week based on the provided start day
  findStartDateOfWeek(StartOfWeek: number): Date {
    let mDifference = new Date().getDay() - StartOfWeek;
    if (mDifference < 0) {
        mDifference += 7;
    }
    let startDateOfWeek = new Date();
    startDateOfWeek.setDate(startDateOfWeek.getDate() + mDifference * -1);
    return startDateOfWeek;
  }

  // Handle week change based on user interaction
  onWeekChange(operation: string){
    const current = new Date(this.startDate);
    if(operation === '+'){
      current.setDate(current.getDate() + 7);
    }
    else if(operation === '-'){
      current.setDate(current.getDate() - 7);
    }
    this.weekChange.emit(current);
    this.startDate = current;
  }
}
