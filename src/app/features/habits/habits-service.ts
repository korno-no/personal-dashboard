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

  getHabits(): Observable<Response<Habit[]>> {
    return this.http.get<Response<Habit[]>>('/api/habits');
  }

  getHabitsWithChecks(startDate: Date): Observable<Response<Habit[]>> {
    return this.http.get<Response<Habit[]>>('/api/habits/checks', {
      params: {
        startDate: startDate.toISOString().split('T')[0],
      }
    });
  }

  createHabit(habit: { name: string; desiredQuantity: number }) {
    return this.http.post('/api/habits', habit);
  }

  deleteHabit(id: string) {
    return this.http.delete(`/api/habits/${id}`);
  }

}
