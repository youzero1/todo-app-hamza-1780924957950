import { CheckSquare } from 'lucide-react';

export default function Header() {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="p-2 bg-brand-500 rounded-xl shadow-lg">
        <CheckSquare className="w-7 h-7 text-white" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">My Todos</h1>
        <p className="text-sm text-gray-500">Stay organized, get things done</p>
      </div>
    </div>
  );
}
