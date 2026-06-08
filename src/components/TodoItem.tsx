import { useState } from 'react';
import { Trash2, Pencil, Check, X, Tag, Flag } from 'lucide-react';
import { Todo, Priority } from '@/types';
import { cn } from '@/lib/utils';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string, priority: Priority, category: string) => void;
};

const PRIORITY_STYLES: Record<Priority, string> = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700',
};

const PRIORITY_DOT: Record<Priority, string> = {
  low: 'bg-green-400',
  medium: 'bg-yellow-400',
  high: 'bg-red-500',
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo.text);
  const [editPriority, setEditPriority] = useState<Priority>(todo.priority);
  const [editCategory, setEditCategory] = useState<string>(todo.category);

  function handleSave(): void {
    if (!editText.trim()) return;
    onEdit(todo.id, editText, editPriority, editCategory);
    setEditing(false);
  }

  function handleCancel(): void {
    setEditText(todo.text);
    setEditPriority(todo.priority);
    setEditCategory(todo.category);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  }

  const PRIORITY_OPTIONS: Priority[] = ['low', 'medium', 'high'];

  return (
    <li
      className={cn(
        'bg-white rounded-2xl border shadow-sm transition-all duration-200 group',
        todo.completed ? 'border-gray-100 opacity-70' : 'border-gray-100 hover:border-brand-200 hover:shadow-md'
      )}
    >
      {editing ? (
        <div className="p-4 flex flex-col gap-3">
          <input
            autoFocus
            type="text"
            value={editText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent text-gray-800"
          />
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex gap-1">
              {PRIORITY_OPTIONS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setEditPriority(p)}
                  className={cn(
                    'px-2.5 py-1 text-xs font-medium rounded-lg border transition-all capitalize',
                    editPriority === p
                      ? PRIORITY_STYLES[p] + ' ring-2 ring-offset-1 ring-current'
                      : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={editCategory}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditCategory(e.target.value)}
              placeholder="Category"
              className="flex-1 min-w-24 px-2.5 py-1 text-xs rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent text-gray-700 placeholder-gray-400"
            />
            <div className="flex gap-1 ml-auto">
              <button
                onClick={handleSave}
                className="p-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white transition-colors"
                title="Save"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleCancel}
                className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
                title="Cancel"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => onToggle(todo.id)}
            className={cn(
              'flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
              todo.completed
                ? 'bg-brand-500 border-brand-500'
                : 'border-gray-300 hover:border-brand-400'
            )}
            title="Toggle complete"
          >
            {todo.completed && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
          </button>

          <div className="flex-1 min-w-0">
            <p
              className={cn(
                'text-sm font-medium truncate',
                todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
              )}
            >
              {todo.text}
            </p>
            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
              <span className={cn('inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-md font-medium', PRIORITY_STYLES[todo.priority])}>
                <span className={cn('w-1.5 h-1.5 rounded-full', PRIORITY_DOT[todo.priority])} />
                <Flag className="w-2.5 h-2.5" />
                {todo.priority}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                <Tag className="w-2.5 h-2.5" />
                {todo.category}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setEditing(true)}
              className="p-1.5 rounded-lg hover:bg-brand-50 text-gray-400 hover:text-brand-500 transition-colors"
              title="Edit"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
              title="Delete"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
