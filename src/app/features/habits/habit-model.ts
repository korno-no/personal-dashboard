export interface Habit {
  id: string;
  name: string;
  desiredQuantity: number;
  createdAt: Date;
  checks: HabitCheck[];
}

export interface HabitCheck {
  id: string;
  date: Date;
  quantity: number;
}
