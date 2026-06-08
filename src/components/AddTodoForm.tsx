import { useState } from 'react';
import { Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { Priority } from '@/types';
import { cn } from '@/lib/utils';

type AddTodoFormProps = {
  onAdd: (text: string, priority: Priority, category: string) => void;
};

const PRIORITY_OPTIONS: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'bg-green-100 text-green-700 border-green-200' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { value: 'high', label: 'High', color: 'bg-red-100 text-red-700 border-red-200' },
];

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState<string>('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<string>('');
  const [showOptions, setShowOptions] = useState<boolean>(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority, category);
    setText('');
    setPriority('medium');
    setCategory('');
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent text-gray-800 placeholder-gray-400 text-sm"
        />
        <button
          type="button"
          onClick={() => setShowOptions((v) => !v)}
          className="px-3 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors"
          title="More options"
        >
          {showOptions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        <button
          type="submit"
          className="flex items-center gap-1.5 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-medium text-sm transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      {showOptions && (
        <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Priority</label>
            <div className="flex gap-1.5">
              {PRIORITY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setPriority(opt.value)}
                  className={cn(
                    'px-3 py-1 text-xs font-medium rounded-lg border transition-all',
                    priority === opt.value
                      ? opt.color + ' ring-2 ring-offset-1 ring-current'
                      : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1 flex-1 min-w-32">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
              placeholder="e.g. Work, Personal..."
              className="px-3 py-1 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>
      )}
    </form>
  );
}
