import { Search, X } from 'lucide-react';
import { FilterType } from '@/types';
import { cn } from '@/lib/utils';

type FilterBarProps = {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  categoryFilter: string;
  setCategoryFilter: (c: string) => void;
  categories: string[];
};

const FILTER_OPTIONS: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function FilterBar({
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  categories,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-4 py-3 mb-4 flex flex-col gap-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-9 pr-9 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent text-gray-700 placeholder-gray-400"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-1">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={cn(
                'px-3 py-1 text-xs font-medium rounded-lg transition-all',
                filter === opt.value
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'text-gray-500 hover:bg-gray-100'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {categories.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap">
            <button
              onClick={() => setCategoryFilter('all')}
              className={cn(
                'px-2.5 py-1 text-xs rounded-lg transition-all',
                categoryFilter === 'all'
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              )}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={cn(
                  'px-2.5 py-1 text-xs rounded-lg transition-all',
                  categoryFilter === cat
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
