export interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: string;
  dueDate: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}