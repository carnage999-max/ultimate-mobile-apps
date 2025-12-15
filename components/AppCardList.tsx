'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface AppCardListProps {
  name: string;
  tagline: string;
  icon: string;
  iosURL: string;
  androidURL: string;
}

export default function AppCardList({ name, tagline, icon, iosURL, androidURL }: AppCardListProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative group tech-border-animated">
      {/* Segmented HUD Frame with z-index */}

      {/* TOP LEFT CORNER */}
      <div className="absolute top-2 left-2 pointer-events-none z-10">
        <div className="absolute top-0 left-0 w-10 h-0.5 bg-linear-to-r from-cyan-400 to-cyan-400/30 rounded-full"
             style={{
               boxShadow: '0 0 6px rgba(92, 225, 230, 0.8), 0 0 12px rgba(92, 225, 230, 0.4)',
               filter: 'drop-shadow(0 0 3px rgba(92, 225, 230, 0.6))',
               animation: 'energy-pulse 3s ease-in-out infinite'
             }} />
        <div className="absolute top-0 left-0 w-0.5 h-10 bg-linear-to-b from-cyan-400 to-cyan-400/30 rounded-full"
             style={{
               boxShadow: '0 0 6px rgba(92, 225, 230, 0.8), 0 0 12px rgba(92, 225, 230, 0.4)',
               filter: 'drop-shadow(0 0 3px rgba(92, 225, 230, 0.6))',
               animation: 'energy-pulse 3s ease-in-out infinite 0.5s'
             }} />
        <div className="absolute top-1 left-1 w-2 h-0.5 bg-linear-to-r from-cyan-400/60 to-transparent rounded-full"
             style={{ boxShadow: '0 0 4px rgba(92, 225, 230, 0.5)' }} />
        <div className="absolute top-1 left-1 w-0.5 h-2 bg-linear-to-b from-cyan-400/60 to-transparent rounded-full"
             style={{ boxShadow: '0 0 4px rgba(92, 225, 230, 0.5)' }} />
      </div>

      {/* TOP RIGHT CORNER */}
      <div className="absolute top-2 right-2 pointer-events-none z-10">
        <div className="absolute top-0 right-0 w-10 h-0.5 bg-linear-to-l from-cyan-400 to-cyan-400/30 rounded-full"
             style={{
               boxShadow: '0 0 6px rgba(92, 225, 230, 0.8), 0 0 12px rgba(92, 225, 230, 0.4)',
               filter: 'drop-shadow(0 0 3px rgba(92, 225, 230, 0.6))',
               animation: 'energy-pulse 3s ease-in-out infinite 1s'
             }} />
        <div className="absolute top-0 right-0 w-0.5 h-10 bg-linear-to-b from-cyan-400 to-cyan-400/30 rounded-full"
             style={{
               boxShadow: '0 0 6px rgba(92, 225, 230, 0.8), 0 0 12px rgba(92, 225, 230, 0.4)',
               filter: 'drop-shadow(0 0 3px rgba(92, 225, 230, 0.6))',
               animation: 'energy-pulse 3s ease-in-out infinite 1.5s'
             }} />
        <div className="absolute top-1 right-1 w-2 h-0.5 bg-linear-to-l from-cyan-400/60 to-transparent rounded-full"
             style={{ boxShadow: '0 0 4px rgba(92, 225, 230, 0.5)' }} />
        <div className="absolute top-1 right-1 w-0.5 h-2 bg-linear-to-b from-cyan-400/60 to-transparent rounded-full"
             style={{ boxShadow: '0 0 4px rgba(92, 225, 230, 0.5)' }} />
      </div>

      {/* BOTTOM RIGHT CORNER */}
      <div className="absolute bottom-2 right-2 pointer-events-none z-10">
        <div className="absolute bottom-0 right-0 w-10 h-0.5 bg-linear-to-l from-cyan-400 to-cyan-400/30 rounded-full"
             style={{
               boxShadow: '0 0 6px rgba(92, 225, 230, 0.8), 0 0 12px rgba(92, 225, 230, 0.4)',
               filter: 'drop-shadow(0 0 3px rgba(92, 225, 230, 0.6))',
               animation: 'energy-pulse 3s ease-in-out infinite 2s'
             }} />
        <div className="absolute bottom-0 right-0 w-0.5 h-10 bg-linear-to-t from-cyan-400 to-cyan-400/30 rounded-full"
             style={{
               boxShadow: '0 0 6px rgba(92, 225, 230, 0.8), 0 0 12px rgba(92, 225, 230, 0.4)',
               filter: 'drop-shadow(0 0 3px rgba(92, 225, 230, 0.6))',
               animation: 'energy-pulse 3s ease-in-out infinite 2.5s'
             }} />
        <div className="absolute bottom-1 right-1 w-2 h-0.5 bg-linear-to-l from-cyan-400/60 to-transparent rounded-full"
             style={{ boxShadow: '0 0 4px rgba(92, 225, 230, 0.5)' }} />
        <div className="absolute bottom-1 right-1 w-0.5 h-2 bg-linear-to-t from-cyan-400/60 to-transparent rounded-full"
             style={{ boxShadow: '0 0 4px rgba(92, 225, 230, 0.5)' }} />
      </div>

      {/* BOTTOM LEFT CORNER */}
      <div className="absolute bottom-2 left-2 pointer-events-none z-10">
        <div className="absolute bottom-0 left-0 w-10 h-0.5 bg-linear-to-r from-cyan-400 to-cyan-400/30 rounded-full"
             style={{
               boxShadow: '0 0 6px rgba(92, 225, 230, 0.8), 0 0 12px rgba(92, 225, 230, 0.4)',
               filter: 'drop-shadow(0 0 3px rgba(92, 225, 230, 0.6))',
               animation: 'energy-pulse 3s ease-in-out infinite 0.25s'
             }} />
        <div className="absolute bottom-0 left-0 w-0.5 h-10 bg-linear-to-t from-cyan-400 to-cyan-400/30 rounded-full"
             style={{
               boxShadow: '0 0 6px rgba(92, 225, 230, 0.8), 0 0 12px rgba(92, 225, 230, 0.4)',
               filter: 'drop-shadow(0 0 3px rgba(92, 225, 230, 0.6))',
               animation: 'energy-pulse 3s ease-in-out infinite 0.75s'
             }} />
        <div className="absolute bottom-1 left-1 w-2 h-0.5 bg-linear-to-r from-cyan-400/60 to-transparent rounded-full"
             style={{ boxShadow: '0 0 4px rgba(92, 225, 230, 0.5)' }} />
        <div className="absolute bottom-1 left-1 w-0.5 h-2 bg-linear-to-t from-cyan-400/60 to-transparent rounded-full"
             style={{ boxShadow: '0 0 4px rgba(92, 225, 230, 0.5)' }} />
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-5"
           style={{
             filter: 'drop-shadow(0 0 12px rgba(92, 225, 230, 0.4))'
           }}
      />

      {/* Main Content */}
      <div className="relative rounded-xl p-3 transition-all duration-300 h-full flex flex-col"
           style={{
             background: 'rgba(0, 0, 0, 0.85)',
             backdropFilter: 'blur(8px)'
           }}>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 h-full">
        {/* App Icon */}
        <div className="flex-shrink-0">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden glass border border-white/20 transition-all flex items-center justify-center">
            {!imageError ? (
              <Image
                src={icon}
                alt={`${name} icon`}
                width={80}
                height={80}
                className="object-cover w-full h-full"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-bold bg-gradient-to-br from-purple-500/30 to-blue-500/30 text-purple-300">
                {name.charAt(0)}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-center sm:text-left flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold mb-0.5 text-white">{name}</h3>
            <p className="text-xs text-gray-400 mb-2">{tagline}</p>
          </div>
          
          {/* Store Badges */}
          <div className="flex flex-col sm:flex-row gap-2 justify-center sm:justify-start">
            <Link
              href={iosURL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg transition-all text-xs font-medium text-white border border-cyan-400/50 hover:border-cyan-400/80 bg-black/40 hover:bg-black/60"
              style={{
                boxShadow: '0 0 6px rgba(92, 225, 230, 0.2)',
                transition: 'all 0.3s ease'
              }}
            >
              <Image
                src="/App_Store.svg"
                alt="App Store"
                width={14}
                height={14}
                className="w-3.5 h-3.5"
              />
              App Store
            </Link>
            <Link
              href={androidURL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg transition-all text-xs font-medium text-white border border-cyan-400/50 hover:border-cyan-400/80 bg-black/40 hover:bg-black/60"
              style={{
                boxShadow: '0 0 6px rgba(92, 225, 230, 0.2)',
                transition: 'all 0.3s ease'
              }}
            >
              <Image
                src="/Google_Play_icon.svg"
                alt="Google Play"
                width={14}
                height={14}
                className="w-3.5 h-3.5"
              />
              Google Play
            </Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

