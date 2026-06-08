import { useTodos } from '@/hooks/useTodos';
import Header from '@/components/Header';
import AddTodoForm from '@/components/AddTodoForm';
import FilterBar from '@/components/FilterBar';
import TodoList from '@/components/TodoList';
import StatsBar from '@/components/StatsBar';

export default function TodoPage() {
  const {
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
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-100">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Header />
        <AddTodoForm onAdd={addTodo} />
        <StatsBar
          activeCount={activeCount}
          completedCount={completedCount}
          onToggleAll={toggleAll}
          onClearCompleted={clearCompleted}
        />
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          categories={categories}
        />
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </div>
    </div>
  );
}
