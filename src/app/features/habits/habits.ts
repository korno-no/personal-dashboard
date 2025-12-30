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

  private habitsService = inject(HabitsService);
  newHabit = '';
  habits: Habit[] = [];

  ngOnInit(): void {
    this.habitsService.getHabits().subscribe(habits => {
      console.log("Habits:", habits);
      this.habits = habits.data;
    });
    
    this.habitsService.getHabitsWithChecks().subscribe(habitsWithChecks => {
      console.log("Habits with checks:", habitsWithChecks);
    });
  }

  onWeekChange(firstDayOfWeek: Date) {
    console.log("Selected week starting on: ", firstDayOfWeek);
  }

  createHabit() {
    const habit = {
      name: this.newHabit.trim(),
      desiredQuantity: 1,
    };
    this.habitsService.createHabit(habit).subscribe(() => {
      this.newHabit = '';
    });
  }
}
