import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Habit } from './habit-model';

@Injectable({
  providedIn: 'root'
})
export class HabitsService {

  constructor(private http: HttpClient) {}

  getHabits() {
    return this.http.get('/api/habits');
  }

  createHabit(habit: Habit) {
    return this.http.post('/api/habits', habit);
  }

  deleteHabit(id: string) {
    return this.http.delete(`/api/habits/${id}`);
  }

}
