'use client';

import { useState, useRef, ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

interface CarouselProps {
  title?: string;
  children: ReactNode;
  showTitleArrow?: boolean;
}

export default function Carousel({
  title,
  children,
  showTitleArrow = false,
}: CarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 600, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -600, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <div className='relative w-full max-w-full overflow-hidden'>
      {title && (
        <div className='flex items-center justify-between mb-2 overflow-hidden'>
          <h2 className='text-lg font-medium flex items-center gap-1 overflow-hidden'>
            {title} {showTitleArrow && <ChevronRight className='h-4 w-4' />}
          </h2>
        </div>
      )}

      <div className='relative group overflow-hidden'>
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
            aria-label='Scroll left'
          >
            <ChevronRight className='h-6 w-6 rotate-180' />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          className='flex gap-2 overflow-x-scroll no-scrollbar snap-x'
          onScroll={handleScroll}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {children}
        </div>

        {showRightArrow && (
          <button
            onClick={scrollRight}
            className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
            aria-label='Scroll right'
          >
            <ChevronRight className='h-6 w-6' />
          </button>
        )}
      </div>
    </div>
  );
}

export const sampleVideos = [
  {
    id: 1,
    title: 'Krudowie',
    thumbnail: '/placeholder.svg?height=180&width=320',
    provider: 'netflix',
  },
  {
    id: 2,
    title: 'MIB',
    thumbnail: '/placeholder.svg?height=180&width=320',
    provider: 'netflix',
  },
  {
    id: 3,
    title: 'Breaking Bad',
    thumbnail: '/placeholder.svg?height=180&width=320',
    provider: 'netflix',
    badge: 'Breaking Bad',
  },
  {
    id: 4,
    title: 'Cassandra',
    thumbnail: '/placeholder.svg?height=180&width=320',
    provider: 'netflix',
  },
  {
    id: 5,
    title: 'Eastars',
    thumbnail: '/placeholder.svg?height=180&width=320',
    provider: 'netflix',
    badge: 'EASTARS',
  },
  {
    id: 6,
    title: 'All of Us Are Dead',
    thumbnail: '/placeholder.svg?height=180&width=320',
    provider: 'netflix',
  },
  {
    id: 7,
    title: 'Stranger Things',
    thumbnail: '/placeholder.svg?height=180&width=320',
    provider: 'netflix',
  },
  {
    id: 8,
    title: 'The Witcher',
    thumbnail: '/placeholder.svg?height=180&width=320',
    provider: 'netflix',
  },
];
