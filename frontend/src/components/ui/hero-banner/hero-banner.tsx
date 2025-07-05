'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Info, Volume2, VolumeX, X } from 'lucide-react';
import './hero-banner.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import {
  isHLSProvider,
  type MediaCanPlayDetail,
  type MediaCanPlayEvent,
  type MediaPlayerInstance,
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
} from '@vidstack/react';

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

interface HeroBannerProps {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  logoUrl?: string;
  id?: string | number;
  genre?: string;
  year?: string | number;
  rating?: string;
  duration?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  description,
  videoUrl,
  thumbnailUrl,
  logoUrl,
  id = '',
  genre = 'Action • Adventure • Sci-Fi',
  year = '2022',
  rating = 'PG-13',
  duration = '2h 35m',
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const playerRef = useRef<MediaPlayerInstance>(null);
  const router = useRouter();

  useEffect(() => {
    // Mark as client-side after mounting
    setIsClient(true);

    // Set up player when component mounts
    const player = playerRef.current;
    if (player) {
      // When player is ready, start playing
      const unsubscribe = player.subscribe(({ canPlay }) => {
        if (canPlay) {
          setTimeout(() => {
            player.play();
            setIsPlaying(true);
          }, 300);
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, []);

  function onProviderChange(
    provider: MediaProviderAdapter | null,
    nativeEvent: MediaProviderChangeEvent
  ) {
    // We can configure provider's here.
    if (isHLSProvider(provider)) {
      provider.config = {};
    }
  }

  const toggleMute = () => {
    if (playerRef.current) {
      playerRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handlePlayClick = () => {
    // Navigate to the video player page
    router.push(`/watch/${id || '1'}?video=${encodeURIComponent(videoUrl)}`);
  };

  const handleMoreInfoClick = () => {
    // Show the info modal
    setShowInfoModal(true);
    // Pause the video when showing modal
    if (playerRef.current) {
      playerRef.current.pause();
    }
  };

  // Don't render the player on the server side
  if (!isClient) {
    return (
      <div className='hero-banner'>
        <div
          className='hero-thumbnail'
          style={{ backgroundImage: `url(${thumbnailUrl})` }}
        />
        <div className='hero-overlay' />
        <div className='hero-content'>
          {logoUrl ? (
            <img src={logoUrl} alt={title} className='hero-logo' />
          ) : (
            <h1 className='hero-title'>{title}</h1>
          )}
          <p className='hero-description'>{description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='hero-banner'>
      <div className='hero-player-wrapper'>
        <MediaPlayer
          className='hero-media-player'
          ref={playerRef}
          src={videoUrl}
          muted={isMuted}
          autoPlay
          playsInline
          loop
          onProviderChange={onProviderChange}
          crossOrigin
        >
          <MediaProvider />

          <Poster className='vds-poster' src={thumbnailUrl} alt={title} />

          {/* We don't need default controls for hero banner */}
          <div className='hero-overlay' />
        </MediaPlayer>
      </div>

      {/* Content */}
      <div className='hero-content'>
        {logoUrl ? (
          <img src={logoUrl} alt={title} className='hero-logo' />
        ) : (
          <h1 className='hero-title'>{title}</h1>
        )}

        <p className='hero-description'>{description}</p>

        <div className='hero-buttons'>
          <button className='hero-button play-button' onClick={handlePlayClick}>
            <Play size={20} /> Play
          </button>
          <button
            className='hero-button info-button'
            onClick={handleMoreInfoClick}
          >
            <Info size={20} /> More Info
          </button>
        </div>
      </div>

      {/* Volume toggle button */}
      <button className='volume-toggle' onClick={toggleMute}>
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {/* Info Modal */}
      {showInfoModal && (
        <div className='hero-info-modal'>
          <div className='hero-info-modal-content'>
            <button
              className='hero-info-modal-close'
              onClick={() => {
                setShowInfoModal(false);
                // Resume video playback when closing modal if player was previously playing
                if (playerRef.current && isPlaying) {
                  playerRef.current.play();
                }
              }}
            >
              <X size={24} />
            </button>

            <div className='hero-info-modal-header'>
              <div
                className='hero-info-modal-backdrop'
                style={{ backgroundImage: `url(${thumbnailUrl})` }}
              />

              <div className='hero-info-modal-title-area'>
                {logoUrl ? (
                  <img src={logoUrl} alt={title} className='hero-logo' />
                ) : (
                  <h1 className='hero-title'>{title}</h1>
                )}

                <div className='hero-info-meta'>
                  <span className='hero-info-year'>{year}</span>
                  <span className='hero-info-rating'>{rating}</span>
                  <span className='hero-info-duration'>{duration}</span>
                </div>

                <button
                  className='hero-button play-button play-button-large'
                  onClick={handlePlayClick}
                >
                  <Play size={24} /> Play
                </button>
              </div>
            </div>

            <div className='hero-info-modal-body'>
              <p className='hero-info-description'>{description}</p>
              <div className='hero-info-details'>
                <p>
                  <span className='hero-info-label'>Genres:</span> {genre}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroBanner;
