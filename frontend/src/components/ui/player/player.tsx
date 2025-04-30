"use client"

import './player.css';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  isHLSProvider,
  type MediaCanPlayDetail,
  type MediaCanPlayEvent,
  type MediaPlayerInstance,
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
} from '@vidstack/react';

import {
  defaultLayoutIcons,
} from '@vidstack/react/player/layouts/default';

// Use dynamic imports with ssr: false to prevent hydration errors
const MediaPlayer = dynamic(
  () => import('@vidstack/react').then((mod) => mod.MediaPlayer),
  { ssr: false }
);

const MediaProvider = dynamic(
  () => import('@vidstack/react').then((mod) => mod.MediaProvider),
  { ssr: false }
);

const Poster = dynamic(
  () => import('@vidstack/react').then((mod) => mod.Poster),
  { ssr: false }
);

const DefaultVideoLayout = dynamic(
  () => import('@vidstack/react/player/layouts/default').then((mod) => mod.DefaultVideoLayout),
  { ssr: false }
);

export function Player() {
  let player = useRef<MediaPlayerInstance>(null),
    [src, setSrc] = useState('https://www.youtube.com/watch?v=urTfEEsGHds');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side after mounting
    setIsClient(true);

    // Subscribe to state updates.
    if (player.current) {
      return player.current.subscribe(({ paused, viewType }) => {
        // console.log('is paused?', '->', paused);
        // console.log('is audio view?', '->', viewType === 'audio');
      });
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

  // We can listen for the `can-play` event to be notified when the player is ready.
  function onCanPlay(detail: MediaCanPlayDetail, nativeEvent: MediaCanPlayEvent) {
    // ...
  }

  // Don't render the player on the server side
  if (!isClient) {
    return <div className="player-loading">Loading player...</div>;
  }

  return (
    <div className="player-container">
      <MediaPlayer
        className="player"
        title="Sprite Fight"
        src={src}
        crossOrigin
        playsInline
        onProviderChange={onProviderChange}
        onCanPlay={onCanPlay}
        ref={player}
      >
        <MediaProvider>
          <Poster
            className="vds-poster"
            src="https://files.vidstack.io/sprite-fight/poster.webp"
            alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
          />
        </MediaProvider>

        {/* Layouts */}
        <DefaultVideoLayout
          icons={defaultLayoutIcons}
          thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
        />
      </MediaPlayer>
    </div>
  );
}