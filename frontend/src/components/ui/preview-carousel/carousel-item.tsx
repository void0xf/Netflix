'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export interface CarouselItemProps {
  title: string;
  thumbnail: string;
  badge?: string;
  children?: React.ReactNode;
  videoUrl?: string;
}

export default function CarouselItem({
  title,
  thumbnail,
  badge,
  children,
  videoUrl,
}: CarouselItemProps) {
  const router = useRouter();
  const navigateToUrl = () => {
    if (!videoUrl) {
      console.error('No videoUrl provided to CarouselItem');
      return;
    }
    try {
      const videoId = new URL(videoUrl).searchParams.get('v');
      if (videoId) {
        router.push(`/video/${videoId}`);
      } else {
        console.error('Could not extract videoId from URL:', videoUrl);
      }
    } catch (error) {
      console.error(
        'Invalid videoUrl provided to CarouselItem:',
        videoUrl,
        error
      );
    }
  };

  return (
    <div
      className='flex-shrink-0 relative cursor-pointer transition-transform duration-300 hover:scale-105 snap-start'
      onClick={() => {
        navigateToUrl();
      }}
    >
      <div className='relative w-[180px] h-[100px] sm:w-[220px] sm:h-[124px] md:w-[260px] md:h-[146px] overflow-hidden rounded'>
        <Image
          src={thumbnail || '/placeholder.svg'}
          alt={title}
          fill
          className='object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end'>
          <div className='p-2'>
            <p className='text-sm font-medium'>{title}</p>
            {children}
          </div>
        </div>
        {badge && (
          <div className='absolute top-1 right-1 bg-red-600 px-1 py-0.5 text-xs font-medium rounded'>
            {badge}
          </div>
        )}
      </div>
    </div>
  );
}
