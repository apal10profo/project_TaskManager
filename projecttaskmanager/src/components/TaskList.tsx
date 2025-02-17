import React from 'react';
import { CheckCircle2, Circle, Clock, Trash2 } from 'lucide-react';
import { Task } from '../types/task';
import { categories } from '../constants/categories';

interface TaskListProps {
  tasks: Task[];
  filter: 'all' | 'active' | 'completed';
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export function TaskList({ tasks, filter, onToggleTask, onDeleteTask }: TaskListProps) {
  const isOverdue = (date: string) => {
    return new Date(date).getTime() < new Date().setHours(0, 0, 0, 0);
  };

  const filteredTasks = tasks
    .filter(task => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    })
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-3">
          <CheckCircle2 className="w-12 h-12 mx-auto" />
        </div>
        <p className="text-gray-500 text-lg">
          {filter === 'all' 
            ? 'No tasks yet. Add some tasks to get started!'
            : filter === 'active'
            ? 'No active tasks. Time to add some!'
            : 'No completed tasks yet. Keep going!'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map(task => {
        const category = categories.find(c => c.id === task.category);
        return (
          <div
            key={task.id}
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group relative"
          >
            <button
              onClick={() => onToggleTask(task.id)}
              className="text-gray-400 hover:text-purple-600 transition-colors"
            >
              {task.completed ? (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              ) : (
                <Circle className="w-6 h-6" />
              )}
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`flex-1 ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                  {task.title}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${category?.color}`}>
                  {category?.name}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span className={isOverdue(task.dueDate) && !task.completed ? 'text-red-500 font-medium' : ''}>
                  Due {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}