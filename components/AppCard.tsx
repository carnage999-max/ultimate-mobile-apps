'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface AppCardProps {
  name: string;
  tagline: string;
  icon: string;
  iosURL: string;
  androidURL: string;
}

export default function AppCard({ name, tagline, icon, iosURL, androidURL }: AppCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group relative tech-border-animated">
      {/* Segmented HUD Frame - positioned ABOVE content with z-index */}

      {/* TOP LEFT CORNER */}
      <div className="absolute top-3 left-3 pointer-events-none z-10">
        <div className="absolute top-0 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-400/30 rounded-full"
             style={{
               boxShadow: '0 0 6px rgba(92, 225, 230, 0.8), 0 0 12px rgba(92, 225, 230, 0.4)',
               filter: 'drop-shadow(0 0 3px rgba(92, 225, 230, 0.6))',
               animation: 'energy-pulse 3s ease-in-out infinite'
             }} />
        <div className="absolute top-0 left-0 w-0.5 h-12 bg-gradient-to-b from-cyan-400 to-cyan-400/30 rounded-full"
             style={{
               boxShadow: '0 0 6px rgba(92, 225, 230, 0.8), 0 0 12px rgba(92, 225, 230, 0.4)',
               filter: 'drop-shadow(0 0 3px rgba(92, 225, 230, 0.6))',
               animation: 'energy-pulse 3s ease-in-out infinite 0.5s'
             }} />
        <div className="absolute top-1 left-1 w-3 h-0.5 bg-gradient-to-r from-cyan-400/60 to-transparent rounded-full"
             style={{ boxShadow: '0 0 4px rgba(92, 225, 230, 0.5)' }} />
        <div className="absolute top-1 left-1 w-0.5 h-3 bg-gradient-to-b from-cyan-400/60 to-transparent rounded-full"
             style={{ boxShadow: '0 0 4px rgba(92, 225, 230, 0.5)' }} />
      </div>

      {/* TOP RIGHT CORNER */}
      <div className="absolute top-3 right-3 pointer-events-none z-10">
        <div className="absolute top-0 right-0 w-12 h-0.5 bg-linear-to-l from-cyan-400 to-cyan-400/30 rounded-full"
             style={{
               boxShadow: '0 0 6px rgba(92, 225, 230, 0.8), 0 0 12px rgba(92, 225, 230, 0.4)',
               filter: 'drop-shadow(0 0 3px rgba(92, 225, 230, 0.6))',
               animation: 'energy-pulse 3s ease-in-out infinite 1s'
             }} />
        <div className="absolute top-0 right-0 w-0.5 h-12 bg-linear-to-b from-cyan-400 to-cyan-400/30 rounded-full"
             style={{
               boxShadow: '0 0 6px rgba(92, 225, 230, 0.8), 0 0 12px rgba(92, 225, 230, 0.4)',
               filter: 'drop-shadow(0 0 3px rgba(92, 225, 230, 0.6))',
               animation: 'energy-pulse 3s ease-in-out infinite 1.5s'
             }} />
        <div className="absolute top-1 right-1 w-3 h-0.5 bg-linear-to-l from-cyan-400/60 to-transparent rounded-full"
             style={{ boxShadow: '0 0 4px rgba(92, 225, 230, 0.5)' }} />
        <div className="absolute top-1 right-1 w-0.5 h-3 bg-linear-to-b from-cyan-400/60 to-transparent rounded-full"
             style={{ boxShadow: '0 0 4px rgba(92, 225, 230, 0.5)' }} />
      </div>

      {/* BOTTOM RIGHT CORNER */}
      <div className="absolute bottom-3 right-3 pointer-events-none z-10">
        <div className="absolute bottom-0 right-0 w-12 h-0.5 bg-linear-to-l from-cyan-400 to-cyan-400/30 rounded-full"
             style={{
               boxShadow: '0 0 6px rgba(92, 225, 230, 0.8), 0 0 12px rgba(92, 225, 230, 0.4)',
               filter: 'drop-shadow(0 0 3px rgba(92, 225, 230, 0.6))',
               animation: 'energy-pulse 3s ease-in-out infinite 2s'
             }} />
        <div className="absolute bottom-0 right-0 w-0.5 h-12 bg-linear-to-t from-cyan-400 to-cyan-400/30 rounded-full"
             style={{
               boxShadow: '0 0 6px rgba(92, 225, 230, 0.8), 0 0 12px rgba(92, 225, 230, 0.4)',
               filter: 'drop-shadow(0 0 3px rgba(92, 225, 230, 0.6))',
               animation: 'energy-pulse 3s ease-in-out infinite 2.5s'
             }} />
        <div className="absolute bottom-1 right-1 w-3 h-0.5 bg-linear-to-l from-cyan-400/60 to-transparent rounded-full"
             style={{ boxShadow: '0 0 4px rgba(92, 225, 230, 0.5)' }} />
        <div className="absolute bottom-1 right-1 w-0.5 h-3 bg-linear-to-t from-cyan-400/60 to-transparent rounded-full"
             style={{ boxShadow: '0 0 4px rgba(92, 225, 230, 0.5)' }} />
      </div>

      {/* BOTTOM LEFT CORNER */}
      <div className="absolute bottom-3 left-3 pointer-events-none z-10">
        <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-linear-to-r from-cyan-400 to-cyan-400/30 rounded-full"
             style={{
               boxShadow: '0 0 6px rgba(92, 225, 230, 0.8), 0 0 12px rgba(92, 225, 230, 0.4)',
               filter: 'drop-shadow(0 0 3px rgba(92, 225, 230, 0.6))',
               animation: 'energy-pulse 3s ease-in-out infinite 0.25s'
             }} />
        <div className="absolute bottom-0 left-0 w-0.5 h-12 bg-linear-to-t from-cyan-400 to-cyan-400/30 rounded-full"
             style={{
               boxShadow: '0 0 6px rgba(92, 225, 230, 0.8), 0 0 12px rgba(92, 225, 230, 0.4)',
               filter: 'drop-shadow(0 0 3px rgba(92, 225, 230, 0.6))',
               animation: 'energy-pulse 3s ease-in-out infinite 0.75s'
             }} />
        <div className="absolute bottom-1 left-1 w-3 h-0.5 bg-linear-to-r from-cyan-400/60 to-transparent rounded-full"
             style={{ boxShadow: '0 0 4px rgba(92, 225, 230, 0.5)' }} />
        <div className="absolute bottom-1 left-1 w-0.5 h-3 bg-linear-to-t from-cyan-400/60 to-transparent rounded-full"
             style={{ boxShadow: '0 0 4px rgba(92, 225, 230, 0.5)' }} />
      </div>

      {/* Hover glow enhancement */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-5"
           style={{
             filter: 'drop-shadow(0 0 12px rgba(92, 225, 230, 0.4))'
           }}
      />

      {/* Main Content Container - Dark background */}
      <div className="relative rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300 h-full flex flex-col"
           style={{
             background: 'rgba(0, 0, 0, 0.9)',
             backdropFilter: 'blur(8px)'
           }}>
        {/* App Icon */}
        <div className="mb-4 flex justify-center flex-shrink-0">
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden glass border border-white/20 group-hover:border-white/40 transition-all flex items-center justify-center">
            {!imageError ? (
              <Image
                src={icon}
                alt={`${name} icon`}
                width={96}
                height={96}
                className="object-cover w-full h-full"
                priority
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl font-bold bg-gradient-to-br from-purple-500/30 to-blue-500/30 text-purple-300">
                {name.charAt(0)}
              </div>
            )}
          </div>
        </div>

        {/* App Name */}
        <h3 className="text-xl font-bold mb-2 text-center text-white">{name}</h3>

        {/* Tagline */}
        <p className="text-sm text-gray-400 text-center mb-6 flex-grow">{tagline}</p>

        {/* Store Badges */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center flex-shrink-0">
          <Link
            href={iosURL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all text-sm font-medium text-white border border-cyan-400/50 hover:border-cyan-400/80 bg-black/40 hover:bg-black/60"
            style={{
              boxShadow: '0 0 6px rgba(92, 225, 230, 0.2)',
              transition: 'all 0.3s ease'
            }}
          >
            <Image
              src="/App_Store.svg"
              alt="App Store"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            App Store
          </Link>
          <Link
            href={androidURL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all text-sm font-medium text-white border border-cyan-400/50 hover:border-cyan-400/80 bg-black/40 hover:bg-black/60"
            style={{
              boxShadow: '0 0 6px rgba(92, 225, 230, 0.2)',
              transition: 'all 0.3s ease'
            }}
          >
            <Image
              src="/Google_Play_icon.svg"
              alt="Google Play"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            Google Play
          </Link>
        </div>
      </div>
    </div>
  );
}

