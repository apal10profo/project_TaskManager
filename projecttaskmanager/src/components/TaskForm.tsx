import React from 'react';
import { PlusCircle, Tag, Calendar } from 'lucide-react';
import { categories } from '../constants/categories';

interface TaskFormProps {
  newTask: string;
  selectedCategory: string;
  dueDate: string;
  onSubmit: (e: React.FormEvent) => void;
  onTaskChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onDueDateChange: (value: string) => void;
}

export function TaskForm({
  newTask,
  selectedCategory,
  dueDate,
  onSubmit,
  onTaskChange,
  onCategoryChange,
  onDueDateChange,
}: TaskFormProps) {
  return (
    <form onSubmit={onSubmit} className="mb-8">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => onTaskChange(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
          >
            <PlusCircle className="w-6 h-6" />
          </button>
        </div>
        <div className="flex gap-4">
          <div className="flex-1 flex gap-2 items-center bg-gray-50 px-4 py-2 rounded-lg">
            <Tag className="w-5 h-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="flex-1 bg-transparent focus:outline-none"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="flex-1 flex gap-2 items-center bg-gray-50 px-4 py-2 rounded-lg">
            <Calendar className="w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => onDueDateChange(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="flex-1 bg-transparent focus:outline-none"
            />
          </div>
        </div>
      </div>
    </form>
  );
}