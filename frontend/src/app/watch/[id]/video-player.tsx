"use client";

import { useEffect, useRef } from 'react';
import {
  isHLSProvider,
  MediaPlayer,
  MediaProvider,
  type MediaPlayerInstance,
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
} from '@vidstack/react';

import { DefaultVideoLayout, defaultLayoutIcons } from '@vidstack/react/player/layouts/default';

interface VideoPlayerProps {
  videoId: string;
  videoUrl: string;
}

export default function VideoPlayer({ videoId, videoUrl }: VideoPlayerProps) {
  const playerRef = useRef<MediaPlayerInstance>(null);

  useEffect(() => {
    // Set up player when component mounts
    const player = playerRef.current;
    if (player) {
      const unsubscribe = player.subscribe(({ paused }) => {
        // You can track player state here
      });
      
      return () => {
        unsubscribe();
      };
    }
  }, []);

  function onProviderChange(
    provider: MediaProviderAdapter | null,
    nativeEvent: MediaProviderChangeEvent,
  ) {
    // We can configure provider's here.
    if (isHLSProvider(provider)) {
      provider.config = {};
    }
  }

  return (
    <MediaPlayer
      className="w-full h-full"
      title={`Video ${videoId}`}
      src={videoUrl}
      crossOrigin
      playsInline
      autoPlay
      onProviderChange={onProviderChange}
      ref={playerRef}
    >
      <MediaProvider />
      <DefaultVideoLayout icons={defaultLayoutIcons} />
    </MediaPlayer>
  );
} 