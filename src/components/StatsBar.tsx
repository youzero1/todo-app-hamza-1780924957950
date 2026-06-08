import { Trash2, CheckCheck } from 'lucide-react';

type StatsBarProps = {
  activeCount: number;
  completedCount: number;
  onToggleAll: () => void;
  onClearCompleted: () => void;
};

export default function StatsBar({ activeCount, completedCount, onToggleAll, onClearCompleted }: StatsBarProps) {
  const total = activeCount + completedCount;

  return (
    <div className="flex items-center justify-between bg-white rounded-2xl shadow-sm border border-gray-100 px-4 py-3 mb-3">
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">{activeCount}</span> remaining
        </span>
        {completedCount > 0 && (
          <span className="text-sm text-gray-400">
            {completedCount} done
          </span>
        )}
        {total > 0 && (
          <div className="hidden sm:flex items-center gap-1.5">
            <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-500 rounded-full transition-all duration-300"
                style={{ width: `${total > 0 ? (completedCount / total) * 100 : 0}%` }}
              />
            </div>
            <span className="text-xs text-gray-400">{Math.round(total > 0 ? (completedCount / total) * 100 : 0)}%</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        {total > 0 && (
          <button
            onClick={onToggleAll}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-brand-600 transition-colors px-2 py-1 rounded-lg hover:bg-brand-50"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Toggle all
          </button>
        )}
        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition-colors px-2 py-1 rounded-lg hover:bg-red-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear done
          </button>
        )}
      </div>
    </div>
  );
}
