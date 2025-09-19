import { Component, computed, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from "../../shared/ui/button/button";
import { InputComponent } from "../../shared/ui/input/input";

interface Task{
  id: number;
  text: WritableSignal<string>;
  editText: WritableSignal<string>;
  editing: WritableSignal<boolean> ;
  isDone: WritableSignal<boolean>;
}


@Component({
  selector: 'app-tasks',
  imports: [FormsModule, Button, InputComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  
  private nextId = 0; 

  tasks = signal<Task[]>([]);
  newTask = signal<string>('');
  

  sortedTasks = computed(() =>
  this.tasks().slice().sort((a, b) => Number(a.isDone()) - Number(b.isDone()))
  );

  onAddNewTask(){
    const newTaskText = this.newTask()
    if(!newTaskText?.trim()) return;

    const newTaskObj = {
      id: this.nextId++,
      text: signal(newTaskText),
      editText: signal(newTaskText),
      editing: signal(false),
      isDone: signal(false),
    }
    this.tasks.update(tasks => [...tasks, newTaskObj])
    this.newTask.set('');
  }

  onStartEditTask(index: number){
    this.tasks.update(tasks => 
      tasks.map(task => task.id === index 
      ? (()=>{
        task.editing.set(true)
        return task
      })() 
      : task)
    );

  }

  onCancelEditTask(index: number){
    this.tasks.update( tasks =>
      tasks.map(task => task.id === index 
      ? (() => {
        task.editText.set(task.text());
        task.editing.set(false);
        return task;
      })() 
      : task)
    )
  }

  onSaveEditTask(index: number){
    if(!this.tasks()[index].text().trim()) return
    this.tasks.update( tasks =>
       tasks.map(task => task.id === index 
        ? (()=>{
          task.text.set(task.editText());
          task.editing.set(false);
          return task
        })() 
        : task)
    )
  }

  onDeleteTask(index: number){
    this.tasks.update(tasks => 
      tasks.filter(task => task.id !== index)
    )
  }
}
