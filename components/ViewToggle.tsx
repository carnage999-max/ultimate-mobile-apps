'use client';

import { Grid, List } from 'lucide-react';

type ViewMode = 'grid' | 'list';

interface ViewToggleProps {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export default function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2 glass rounded-lg p-1 border border-white/10">
      <button
        onClick={() => onViewChange('grid')}
        className={`p-2 rounded-md transition-all ${
          view === 'grid'
            ? 'bg-white/10 text-white'
            : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`}
        aria-label="Grid view"
      >
        <Grid size={20} />
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={`p-2 rounded-md transition-all ${
          view === 'list'
            ? 'bg-white/10 text-white'
            : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`}
        aria-label="List view"
      >
        <List size={20} />
      </button>
    </div>
  );
}

