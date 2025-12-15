 'use client';

import { useState } from 'react';
import Image from 'next/image';
import appsData from '@/data/apps.json';
import AppCard from '@/components/AppCard';
import AppCardList from '@/components/AppCardList';
import ViewToggle from '@/components/ViewToggle';

export default function Home() {
  const [view, setView] = useState<'grid' | 'list'>('grid');

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
              <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden mx-auto md:mx-0 border border-white/10 shadow-lg">
                <Image
                  src="/icons/icon.jpeg"
                  alt="Ultimate Mobile Apps"
                  width={224}
                  height={224}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Showcase */}
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
