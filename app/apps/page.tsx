'use client';

import { useState } from 'react';
import appsData from '@/data/apps.json';
import AppCard from '@/components/AppCard';
import AppCardList from '@/components/AppCardList';
import ViewToggle from '@/components/ViewToggle';

export default function Apps() {
  const [view, setView] = useState<'grid' | 'list'>('grid');

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
      <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* View Toggle */}
          <div className="flex justify-end mb-6">
            <ViewToggle view={view} onViewChange={setView} />
          </div>

          {/* Grid View */}
          {view === 'grid' && (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {appsData.map((app) => (
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
              {appsData.map((app) => (
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
    </div>
  );
}

