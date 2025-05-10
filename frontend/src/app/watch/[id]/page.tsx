"use client";

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import {
  isHLSProvider,
  type MediaCanPlayDetail,
  type MediaCanPlayEvent,
  type MediaPlayerInstance,
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
} from '@vidstack/react';

import { ArrowLeft } from 'lucide-react';

// Import styles
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import '@/app/browse/netflix-fonts.css';

// Use dynamic imports for all vidstack components 
const VideoPlayer = dynamic(
  () => import('./video-player'),
  { ssr: false, loading: () => (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div className="text-white text-lg">Loading video player...</div>
    </div>
  )}
);

export default function WatchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = useParams();
  
  const videoUrl = searchParams.get('video') || '';

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="w-full h-screen bg-black flex flex-col netflix-font">
      <div className="absolute top-4 left-4 z-10">
        <button 
          onClick={handleGoBack}
          className="text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-all"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <VideoPlayer 
          videoId={id as string} 
          videoUrl={decodeURIComponent(videoUrl)} 
        />
      </div>
    </div>
  );
} 