import { Component, inject, OnInit } from '@angular/core';
import { Button } from "../../shared/ui/button/button";
import { WeekSelector } from "./week-selector/week-selector";
import { Habit } from './habit-model';
import { HabitsService } from './habits-service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-habits',
  imports: [Button, WeekSelector, FormsModule],
  templateUrl: './habits.html',
  styleUrl: './habits.css'
})
export class Habits implements OnInit {

  firstDayOfWeek: number = 0; // 1 = Monday, 0 = Sunday
  startDate!: Date; 
  private habitsService = inject(HabitsService);
  newHabit = '';
  habits: Habit[] = [];


  ngOnInit(): void {}
  
  getHabitsWithChecks() {
    this.habitsService.getHabitsWithChecks(this.startDate).subscribe(habits => {
      console.log("Habits with checks:", habits);
      this.habits = habits.data;
    });
  }

  onWeekChange(startDate: Date) {
    this.startDate = startDate;
    this.getHabitsWithChecks();
  }

  onHabitCheckChange(habitId: string, weekDayIndex: number) {
    const checkDate = new Date(this.startDate);
    checkDate.setDate(this.startDate.getDate() + weekDayIndex);
    this.habitsService.updateHabitCheck(habitId, checkDate, 1).subscribe(res => {
        console.log("Habit check updated:", res);
    });
  }

  createHabit() {
    const habit = {
      name: this.newHabit.trim(),
      desiredQuantity: 1,
    };
    this.habitsService.createHabit(habit).subscribe(() => {
      this.newHabit = '';
      this.getHabitsWithChecks();
    });
  }
}
