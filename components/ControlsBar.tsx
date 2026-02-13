"use client";

import { useEffect, useState } from 'react';
import ViewToggle from './ViewToggle';

type ViewMode = 'grid' | 'list';

interface ControlsBarProps {
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
  onSearch: (q: string) => void;
  onSortChange: (s: string) => void;
}

export default function ControlsBar({ view, onViewChange, onSearch, onSortChange }: ControlsBarProps) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('name-asc');
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => onSearch(query.trim()), 200);
    return () => clearTimeout(t);
  }, [query, onSearch]);

  useEffect(() => {
    onSortChange(sort);
  }, [sort, onSortChange]);

  useEffect(() => {
    const el = document.getElementById('controls-anchor');
    if (!el) return;
    const rectTop = el.getBoundingClientRect().top + window.scrollY;

    function onScroll() {
      setIsFixed(window.scrollY >= rectTop - 20);
    }

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const containerClass = isFixed
    ? 'fixed top-16 left-0 right-0 z-40 border-b-2 border-cyan-400 p-4 bg-black/95 backdrop-blur'
    : 'w-full border-b-2 border-cyan-400 p-4 mb-6';

  return (
    <div id="controls-anchor" className={containerClass}>
      <div className={`max-w-7xl ${isFixed ? 'mx-auto px-4 sm:px-6 lg:px-8' : 'mx-auto'} flex items-center gap-3 justify-between`}>
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-xs">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search apps..."
              className="w-full pl-10 pr-3 py-2 rounded-md bg-black/60 border-2 border-cyan-400 text-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            />
            <svg className="absolute left-3 top-2.5 w-5 h-5 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
              <circle cx="11" cy="11" r="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-black/60 border-2 border-cyan-400 text-white text-sm py-2 px-3 rounded-md font-medium whitespace-nowrap"
          >
            <option value="name-asc">Name A → Z</option>
            <option value="name-desc">Name Z → A</option>
            <option value="has-android">Has Google Play</option>
            <option value="has-ios">Has App Store</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <ViewToggle view={view} onViewChange={onViewChange} />
        </div>
      </div>
    </div>
  );
}
