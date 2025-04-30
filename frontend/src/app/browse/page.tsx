"use client"
import Carousel from '@/components/ui/preview-carousel/carousel';
import CarouselItem, { CarouselItemProps } from '@/components/ui/preview-carousel/carousel-item';
import Navbar from '@/features/browse/navbar';
import React, { useMemo } from 'react'

// Helper function to shuffle an array
const shuffleArray = (array: any[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const trendingContent = [
  {
    id: 1,
    title: "Dune: Part Two",
    videoUrl:'1',
    thumbnail: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    provider: "netflix",
    type: "movie"
  },
  {
    id: 8,
    title: "The Witcher",
    thumbnail: "https://image.tmdb.org/t/p/w500/cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg",
    provider: "netflix",
    type: "tv"
  },
  {
    id: 201,
    title: "Breaking Bad",
    thumbnail: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    provider: "netflix",
    type: "tv",
    progress: 75
  },
  {
    id: 202,
    title: "The Last of Us",
    thumbnail: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
    provider: "netflix",
    type: "tv",
    progress: 40
  },
  {
    id: 203,
    title: "Black Mirror",
    thumbnail: "https://image.tmdb.org/t/p/w500/5UaYsGZOFhjFDwQh6GuLjjA1WlF.jpg",
    provider: "netflix",
    type: "tv",
    progress: 90,
    badge: "new"
  },
  {
    id: 101,
    title: "Squid Game",
    thumbnail: "https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
    provider: "netflix",
    type: "tv",
    match: 97
  },
  {
    id: 104,
    title: "Wednesday",
    thumbnail: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg", 
    provider: "netflix",
    type: "tv",
    match: 94
  },
  {
    id: 105,
    title: "Money Heist",
    thumbnail: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
    provider: "netflix",
    type: "tv",
    match: 93
  },
  {
    id: 106,
    title: "The Queen's Gambit",
    thumbnail: "https://image.tmdb.org/t/p/w500/zU0htwkhNvBQdVSIKB9s6hgVeFK.jpg",
    provider: "netflix",
    type: "tv",
    match: 98
  }
];

const Page = () => {
  // Use useMemo to shuffle arrays only once when component mounts
  const continueWatching = useMemo(() => {
    const shuffled = shuffleArray(trendingContent);
    // Ensure each item has a progress value
    return shuffled.map(item => ({
      ...item,
      progress: item.progress || Math.floor(Math.random() * 95) + 5 // Random progress between 5-99%
    }));
  }, []);

  const netflixOriginals = useMemo(() => {
    const shuffled = shuffleArray(trendingContent);
    // Ensure each item has a match value
    return shuffled.map(item => ({
      ...item,
      match: item.match || Math.floor(Math.random() * 20) + 80 // Random match between 80-99%
    }));
  }, []);

  return (
    <>
      <Navbar />
      <main className='mt-20 bg-black text-white min-h-screen'>
        <Carousel title="Trending Now">
          {trendingContent.map((item) => (
            <CarouselItem
              key={item.id}
              id={item.id}
              title={item.title}
              thumbnail={item.thumbnail}
              provider={item.provider}
              badge={item.badge}
            />
          ))}
        </Carousel>

        {/* Continue Watching with progress bars */}
        <Carousel title="Continue Watching" showTitleArrow={true}>
          {continueWatching.map((item) => (
            <CarouselItem
              key={item.id}
              id={item.id}
              title={item.title}
              thumbnail={item.thumbnail}
              provider={item.provider}
            >
              <div className="mt-2 w-full bg-gray-600 h-1 rounded-full overflow-hidden">
                <div 
                  className="bg-red-600 h-full" 
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </CarouselItem>
          ))}
        </Carousel>
        
        {/* Netflix Originals with match percentage */}
        <Carousel title="Netflix Originals">
          {netflixOriginals.map((item) => (
            <CarouselItem
              key={item.id}
              id={item.id}
              title={item.title}
              thumbnail={item.thumbnail}
              provider={item.provider}
            >
              <div className="mt-1 text-xs text-green-500 font-medium">
                {item.match}% Match
              </div>
            </CarouselItem>
          ))}
        </Carousel>
      </main>
    </>
  )
}

export default Page;
