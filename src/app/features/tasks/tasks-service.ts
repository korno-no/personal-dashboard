import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task, TaskDTO, createTaskFromDTO } from './task-model';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient){}

  //GET
  async getTasks(): Promise<Task[]>  {
    try{
      const response = await lastValueFrom(
        this.http.get<{ success: boolean; data: TaskDTO[] }>('/api/tasks')
      );
      
      if (!response.success)throw new Error("Backend returned success = false");

      return  response.data.map(taskDTO => createTaskFromDTO(taskDTO));
    } catch (err){
      console.error("Get task error:", err);
      throw err
    }
  }

  //POST
  async createTask(text: string): Promise<Task> {
    try{
      const response = await lastValueFrom(
        this.http.post<{ success: boolean; data: TaskDTO }>(
        '/api/tasks',
        { text }
        )
      );
      if (!response.success)throw new Error("Backend returned success = false");
      else if (!response.data)throw new Error("Backend returned empty data");
      
      return createTaskFromDTO(response.data);
          
    } catch (err){
      console.error("Create task error:", err);
      throw err;
    }
  }


  //PUT
  async updateTask(task: Task): Promise<Task> {
    try{
      const response = await lastValueFrom(
      this.http.put<{success: boolean; data: TaskDTO,}>(
          `/api/tasks/${task.id}`,
          { 
            text: task.editText(),
            isDone: task.isDone()
          }
        )
      )
      if (!response.success)throw new Error("Backend returned success = false");

      return createTaskFromDTO(response.data);

    } catch (err){
      console.error("Update task error:", err);
      throw err;
    }
  }

  //DELETE
  async deleteTask(id: string): Promise<{ success: boolean }>{
    try{
      const response = await lastValueFrom(
        this.http.delete<{ success: boolean }>(
          `/api/tasks/${id}`
        )
      );
      if (!response.success) throw new Error("Backend returned success = false");

      return response

    } catch (err) {
      console.error("Delete task error:", err);
      throw err;
    }
  }
}
