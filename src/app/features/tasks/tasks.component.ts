import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from "../../shared/ui/button/button";
import { InputComponent } from "../../shared/ui/input/input";
import { Task } from '../../shared/models/task-model';
import { TasksService } from '../../core/services/tasks-service';
@Component({
  selector: 'app-tasks',
  imports: [FormsModule, Button, InputComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  
  private tasksService = inject(TasksService)
  tasks = signal<Task[]>([]);
  newTask = signal<string>('');

  // init function => get existing tasks
  async ngOnInit() {
    try{
      const result = await this.tasksService.getTasks()
      this.tasks.set(result);
    } catch (err) {
      // TODO error toaster 
      console.error(err);
    }
  }
  
  sortedTasks = computed(() =>
    this.tasks().slice().sort((a, b) => Number(a.isDone()) - Number(b.isDone()))
  );

  // create new a task
  async onAddNewTask() {
    const newTaskText = this.newTask();
    if (!newTaskText?.trim()) return;
    try {
      const result = await this.tasksService.createTask(newTaskText);
      this.tasks.update(tasks => [...tasks, result]);
    } catch (err) {
      // TODO error toaster 
      console.error(err);
    }
    this.newTask.set('');
  }

  //start editing the task
  onStartEditTask(id: string){
    this.tasks.update(tasks => 
      tasks.map(task => task.id === id 
      ? (()=>{
        task.editing.set(true)
        return task
      })() 
      : task)
    );
  }

  //cancel editing the task
  onCancelEditTask(id: string){
    this.tasks.update( tasks =>
      tasks.map(task => task.id === id 
      ? (() => {
        task.editText.set(task.text());
        task.editing.set(false);
        return task;
      })() 
      : task)
    )
  }

  //save editing the task
  async onSaveEditTask(id: string){
    //check is input empty
    const task = this.tasks().find(t => t.id === id);
    if (!task || !task.text().trim()) return; 
    //check if the value has changed
    else if(task.text().trim()===task.editText().trim()){
      this.onCancelEditTask(id)
    }
    else{
      try{
        const result = await this.tasksService.updateTask(task)
        this.tasks.update( tasks => 
          tasks.map(task => 
            task.id === result.id
            ? result
            : task
          )
        )
      } catch(err) {
        // TODO error toaster 
        console.error(err);
      }
    }
  }

  //delete the task
  async onDeleteTask(index: string){
    try{
      const result = await this.tasksService.deleteTask(index);
      this.tasks.update(tasks => 
        tasks.filter(task => task.id !== index)
      )
    } catch (err) {
      // TODO error toaster 
      console.error(err);
    }
    
  }
}
