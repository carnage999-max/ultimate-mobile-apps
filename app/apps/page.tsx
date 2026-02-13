'use client';

import { useEffect, useMemo, useState } from 'react';
import appsData from '@/data/apps.json';
import AppCard from '@/components/AppCard';
import AppCardList from '@/components/AppCardList';
import ViewToggle from '@/components/ViewToggle';
import ControlsBar from '@/components/ControlsBar';

export default function Apps() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('name-asc');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShowBackToTop(window.scrollY > 300);
    }
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filtered = useMemo(() => {
    let list = appsData.slice();
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((a) => a.name.toLowerCase().includes(q) || (a.tagline || '').toLowerCase().includes(q));
    }
    if (sort === 'name-asc') list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === 'name-desc') list.sort((a, b) => b.name.localeCompare(a.name));
    else if (sort === 'has-android') list = list.filter((a) => a.androidURL && a.androidURL.length > 0);
    else if (sort === 'has-ios') list = list.filter((a) => a.iosURL && a.iosURL.length > 0);
    return list;
  }, [query, sort]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Header */}
      <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Our Apps
          </h1>
          <p className="text-xl text-gray-300">
            Explore our complete portfolio of premium mobile applications
          </p>
        </div>
      </section>

      {/* App Grid/List */}
      <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-20">
        <div className="max-w-7xl mx-auto">
          <ControlsBar
            view={view}
            onViewChange={setView}
            onSearch={(q) => setQuery(q)}
            onSortChange={(s) => setSort(s)}
          />

          <div className="mt-4">
            {/* Grid View */}
            {view === 'grid' && (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filtered.map((app) => (
                  <AppCard
                    key={app.name}
                    name={app.name}
                    tagline={app.tagline}
                    icon={app.icon}
                    iosURL={app.iosURL}
                    androidURL={app.androidURL}
                  />
                ))}
              </div>
            )}

            {/* List View */}
            {view === 'list' && (
              <div className="space-y-4">
                {filtered.map((app) => (
                  <AppCardList
                    key={app.name}
                    name={app.name}
                    tagline={app.tagline}
                    icon={app.icon}
                    iosURL={app.iosURL}
                    androidURL={app.androidURL}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black flex items-center justify-center font-bold text-xl transition-all duration-300"
        >
          ↑
        </button>
      )}
    </div>
  );
}

