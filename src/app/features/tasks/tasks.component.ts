import { Component, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {appAutoFocus} from '../../shared/directives/auto-focus'
import { Button } from "../../shared/ui/button/button";
import { InputComponent } from "../../shared/ui/input/input";


@Component({
  selector: 'app-tasks',
  imports: [FormsModule, appAutoFocus, Button, InputComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  tasks = <{
    text: WritableSignal<string>;
    editText: WritableSignal<string>;
    editing: WritableSignal<boolean> ;
  }[]>([]);
  
  newTask = signal<string>('')

  onAddNewTask(){
    const newTaskText = this.newTask()
    if(!newTaskText?.trim()) return;

    const newTaskObj = {
      text: signal(newTaskText),
      editText: signal(newTaskText),
      editing: signal(false)
    }

    this.tasks.unshift(newTaskObj)
    this.newTask.set('');
  }

  onStartEditTask(index: number){
    this.tasks[index].editing.set(true)
  }

  onCancelEditTask(index: number){
    this.tasks[index].editing.set(false);
    this.tasks[index].editText.set(this.tasks[index].text());
  }

  onSaveEditTask(index: number){
    if(!this.tasks[index].text().trim()) return
    this.tasks[index].text.set( this.tasks[index].editText())
    this.tasks[index].editing.set(false)
  }

  onDeleteTask(index: number){
    this.tasks.splice(index,1)
  }
}
