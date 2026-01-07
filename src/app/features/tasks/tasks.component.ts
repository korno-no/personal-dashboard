import { Component, computed, effect, ElementRef, inject, OnInit, QueryList, signal, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from "../../shared/ui/button/button";
import { InputComponent } from "../../shared/ui/input/input";
import { Task } from './task-model';
import { TasksService } from './tasks-service';
import { TabSlider } from "../../shared/ui/tab-slider/tab-slider";
import { Dropdown } from "../../shared/ui/dropdown/dropdown";

@Component({
  selector: 'app-tasks',
  imports: [FormsModule, Button, TabSlider, Dropdown],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
 
  private tasksService = inject(TasksService)
  tasks = signal<Task[]>([]);
  newTask = signal<string>('');
  selectedTab = signal<number>(0)
  sortBy = signal<'date' | 'text' | 'default'>('default');

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
  
  filteredTasks = computed( () => {
    //active
     if(this.selectedTab() === 1){
      return this.tasks().filter(t => t.isDone() === false);
    }
    //done
    else if(this.selectedTab() === 2){
      return this.tasks().filter(t => t.isDone() === true);
    }
    //false
    else{
      return this.tasks().slice().sort((a, b) => Number(a.isDone()) - Number(b.isDone()));
    }
  })

  processedTaskList = computed(() => {

      if (this.sortBy() === 'text') {
        return  this.filteredTasks().slice().sort((a, b) => a.text().localeCompare(b.text()));
      }
      if(this.sortBy() === 'date'){
        return  this.filteredTasks().slice().sort((a, b) => new Date(b.createdAt).getTime()  - new Date(a.createdAt).getTime() ); 
      }
      else{
        return  this.filteredTasks()
      };
  })

  onSortChange(value: string){
    this.sortBy.set(value as 'date' | 'text' | 'default');
  }

  // create new a task
  async onAddNewTask() {
    const newTaskText = this.newTask();
    if (!newTaskText?.trim()) return;
    try {
      const result = await this.tasksService.createTask(newTaskText);
      this.tasks.update(tasks => [result, ...tasks]);
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
    try { 
      const result = await this.tasksService.updateTask(task)
      this.tasks.update(tasks =>
        tasks.map(t => {
          if (t.id !== id) return t;
            return {
              ...t,
              ...result,
              editing: signal(false)
            };
        }));
    } catch (err) {
      // TODO error toaster 
      console.error(err);
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
