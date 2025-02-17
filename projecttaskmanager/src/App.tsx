import React, { useState, useEffect } from 'react';
import { Task } from './types/task';
import { categories } from './constants/categories';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { FilterButtons } from './components/FilterButtons';

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [dueDate, setDueDate] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: crypto.randomUUID(),
          title: newTask.trim(),
          completed: false,
          category: selectedCategory,
          dueDate: dueDate || new Date().toISOString().split('T')[0],
          createdAt: new Date().toISOString(),
        },
      ]);
      setNewTask('');
      setDueDate('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-emerald-100">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Task Manager</h1>
            <FilterButtons currentFilter={filter} onFilterChange={setFilter} />
          </div>
          
          <TaskForm
            newTask={newTask}
            selectedCategory={selectedCategory}
            dueDate={dueDate}
            onSubmit={addTask}
            onTaskChange={setNewTask}
            onCategoryChange={setSelectedCategory}
            onDueDateChange={setDueDate}
          />

          <TaskList
            tasks={tasks}
            filter={filter}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
          />
        </div>
      </div>
    </div>
  );
}

export default App;