import { WritableSignal, signal } from '@angular/core';

// backend data
export interface TaskDTO {
  id: string;
  text: string;
  isDone: boolean;
}

// model with signals
export interface Task {
  id: string;
  text: WritableSignal<string>;
  editText: WritableSignal<string>;
  editing: WritableSignal<boolean>;
  isDone: WritableSignal<boolean>;
}

// converter
export function createTaskFromDTO(dto: TaskDTO): Task {
  return {
    id: dto.id,
    text: signal(dto.text),
    editText: signal(dto.text),
    editing: signal(false),
    isDone: signal(dto.isDone),
  };
}