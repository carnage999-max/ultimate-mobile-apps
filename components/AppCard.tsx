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
    <div className="group relative">
      {/* Metallic gradient border effect */}
      <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-br from-blue-400/60 via-purple-400/40 to-pink-400/60 pointer-events-none group-hover:from-blue-300/80 group-hover:via-purple-300/60 group-hover:to-pink-300/80 transition-all duration-300" />
      {/* Inner light border for content prominence */}
      <div className="absolute inset-[2px] rounded-2xl border border-cyan-200/30 group-hover:border-cyan-200/50 pointer-events-none transition-all duration-300" />
      <div className="glass-strong rounded-2xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/30 border border-white/20 h-full flex flex-col relative z-10 group-hover:border-white/40">
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
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg glass hover:glass-strong transition-all text-sm font-medium text-white border border-white/20 hover:border-white/40 group/store"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-label="App Store">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C1.79 15.25 2.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            App Store
          </Link>
          <Link
            href={androidURL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg glass hover:glass-strong transition-all text-sm font-medium text-white border border-white/20 hover:border-white/40 group/store"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-label="Google Play">
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
            </svg>
            Google Play
          </Link>
        </div>
      </div>
    </div>
  );
}

