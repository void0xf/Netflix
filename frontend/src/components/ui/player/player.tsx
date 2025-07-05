'use client';

import './player.css';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

import {
  isHLSProvider,
  type MediaCanPlayDetail,
  type MediaCanPlayEvent,
  type MediaPlayerInstance,
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
} from '@vidstack/react';

import { defaultLayoutIcons } from '@vidstack/react/player/layouts/default';

// Use dynamic imports with ssr: false to prevent hydration errors
const MediaPlayer = dynamic(
  () => import('@vidstack/react').then((mod) => mod.MediaPlayer),
  { ssr: false }
);

const MediaProvider = dynamic(
  () => import('@vidstack/react').then((mod) => mod.MediaProvider),
  { ssr: false }
);

const DefaultVideoLayout = dynamic(
  () =>
    import('@vidstack/react/player/layouts/default').then(
      (mod) => mod.DefaultVideoLayout
    ),
  { ssr: false }
);

export function Player() {
  const params = useParams();
  const player = useRef<MediaPlayerInstance>(null);
  const src = `https://www.youtube.com/watch?v=${params.id}`;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side after mounting
    setIsClient(true);

    // Subscribe to state updates.
  }, []);

  function onProviderChange(
    provider: MediaProviderAdapter | null,
    nativeEvent: MediaProviderChangeEvent
  ) {
    // We can configure provider's here.
    if (isHLSProvider(provider)) {
      provider.config = {};
    }
    console.log(nativeEvent.type);
  }

  // We can listen for the `can-play` event to be notified when the player is ready.
  function onCanPlay(
    detail: MediaCanPlayDetail,
    nativeEvent: MediaCanPlayEvent
  ) {
    console.log(detail.duration, nativeEvent.type);
  }

  // Don't render the player on the server side
  if (!isClient) {
    return <div className='player-loading'>Loading player...</div>;
  }

  return (
    <div className='player-container'>
      <MediaPlayer
        className='player'
        title='Sprite Fight'
        src={src}
        crossOrigin
        playsInline
        onProviderChange={onProviderChange}
        onCanPlay={onCanPlay}
        ref={player}
      >
        <MediaProvider>
          {/* <Poster
            className="vds-poster"
            src="https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg"
            alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
          /> */}
        </MediaProvider>

        {/* Layouts */}
        <DefaultVideoLayout icons={defaultLayoutIcons} thumbnails='' />
      </MediaPlayer>
    </div>
  );
}
