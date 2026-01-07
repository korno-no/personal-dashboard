import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Habit } from './habit-model';
import { Observable } from 'rxjs';  
import { Response } from '../../shared/models/responce';

@Injectable({
  providedIn: 'root'
})
export class HabitsService {

  constructor(private http: HttpClient) {}

  /* Habits */
  getHabits(): Observable<Response<Habit[]>> {
    return this.http.get<Response<Habit[]>>('/api/habits');
  }

  createHabit(habit: { name: string; desiredQuantity: number }) {
    return this.http.post('/api/habits', habit);
  }

  deleteHabit(id: string) {
    return this.http.delete(`/api/habits/${id}`);
  }

  /* Habit Checks */
  getHabitsWithChecks(startDate: Date): Observable<Response<Habit[]>> {
    return this.http.get<Response<Habit[]>>('/api/habits/checks', {
      params: {
        startDate: startDate.toLocaleDateString(),
      }
    });
  }

  updateHabitCheck(habitId: string, date: Date, quantity: number) {
    return this.http.put(`/api/habits/${habitId}/checks`, {
      date: date.toISOString().split('T')[0],
      quantity
    });
  }

}
