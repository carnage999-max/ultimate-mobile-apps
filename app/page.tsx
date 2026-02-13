 'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import appsData from '@/data/apps.json';
import AppCard from '@/components/AppCard';
import AppCardList from '@/components/AppCardList';
import ControlsBar from '@/components/ControlsBar';

export default function Home() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('name-asc');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShowBackToTop(window.scrollY > 300);
    }
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
      list = list.filter((a) =>
        a.name.toLowerCase().includes(q) ||
        (a.tagline || '').toLowerCase().includes(q)
      );
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

      {/* Hero Section - responsive image */}
      <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Premium Apps. Unified Vision.
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto md:mx-0">
                Ultimate Mobile Apps develops advanced, secure, user-friendly tools across health, legal, social, and productivity sectors.
              </p>
            </div>

            {/* Image: show above text on mobile (order-first), side on desktop (order-last) */}
            <div className="flex-shrink-0 order-first md:order-last">
              {/* Increased size by ~50%: w-40 -> w-60, sm:w-48 -> sm:w-72, md:w-56 -> md:w-84 */}
              <div className="w-60 h-60 sm:w-72 sm:h-72 md:w-84 md:h-84 rounded-2xl overflow-hidden mx-auto md:mx-0 border border-white/10 shadow-lg">
                <Image
                  src="/icons/icon.jpeg"
                  alt="Ultimate Mobile Apps"
                  width={336}
                  height={336}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Showcase */}
      <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-20">
        <div className="max-w-7xl mx-auto">
          {/* Controls Bar */}
          <ControlsBar
            view={view}
            onViewChange={setView}
            onSearch={setQuery}
            onSortChange={setSort}
          />

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
      </section>

      {/* Back to Top Button */}
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
