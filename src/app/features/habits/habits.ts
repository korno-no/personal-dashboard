import { Component, inject } from '@angular/core';
import { Button } from "../../shared/ui/button/button";
import { WeekSelector } from "./week-selector/week-selector";
import { Habit } from './habit-model';
import { HabitsService } from './habits-service';
import { FormsModule } from '@angular/forms';
import { Modal } from "../../shared/ui/modal/modal";


@Component({
  selector: 'app-habits',
  imports: [Button, WeekSelector, FormsModule, Modal],
  templateUrl: './habits.html',
  styleUrl: './habits.css'
})
export class Habits {
  firstDayOfWeek: number = 0; // 1 = Monday, 0 = Sunday
  startDate!: Date; 
  private habitsService = inject(HabitsService);
  newHabit = '';
  habits: Habit[] = [];
  isModalOpen = false;
  
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

  createHabit(savedName: string) {
    const habit = {
      name: savedName.trim(),
      desiredQuantity: 1,
    };
    this.habitsService.createHabit(habit).subscribe(() => {
      this.newHabit = '';
      this.getHabitsWithChecks();
    });
  }
}
