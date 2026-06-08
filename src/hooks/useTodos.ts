import { useState, useEffect } from 'react';
import { Todo, Priority, FilterType } from '@/types';
import { loadTodos, saveTodos } from '@/lib/storage';
import { generateId } from '@/lib/utils';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos());
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  function addTodo(text: string, priority: Priority, category: string): void {
    if (!text.trim()) return;
    const newTodo: Todo = {
      id: generateId(),
      text: text.trim(),
      completed: false,
      priority,
      createdAt: Date.now(),
      category: category.trim() || 'General',
    };
    setTodos((prev) => [newTodo, ...prev]);
  }

  function toggleTodo(id: string): void {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTodo(id: string): void {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function editTodo(id: string, text: string, priority: Priority, category: string): void {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, text: text.trim(), priority, category: category.trim() || 'General' }
          : t
      )
    );
  }

  function clearCompleted(): void {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }

  function toggleAll(): void {
    const allCompleted = todos.every((t) => t.completed);
    setTodos((prev) => prev.map((t) => ({ ...t, completed: !allCompleted })));
  }

  const categories = Array.from(
    new Set(todos.map((t) => t.category))
  ).filter(Boolean);

  const filteredTodos = todos.filter((t) => {
    const matchesFilter =
      filter === 'all' || (filter === 'active' && !t.completed) || (filter === 'completed' && t.completed);
    const matchesSearch = t.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter;
    return matchesFilter && matchesSearch && matchesCategory;
  });

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return {
    todos,
    filteredTodos,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    categories,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    toggleAll,
    activeCount,
    completedCount,
  };
}
