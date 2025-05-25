
"use client"
import Carousel from '@/components/ui/preview-carousel/carousel';
import CarouselItem, { CarouselItemProps } from '@/components/ui/preview-carousel/carousel-item';
import Navbar from '@/features/browse/navbar';
import Footer from '@/features/browse/footer';
import React, { useEffect, useMemo, useState } from 'react'
import HeroBanner from '@/components/ui/hero-banner/hero-banner';
import './netflix-fonts.css';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../auth/firebase';

import { Movie } from '@/types/movie';


export const trendingContent = [
  {
    id: 1,
    title: "Dune: Part Two",
    videoUrl: "1",
    thumbnail:
      "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    provider: "netflix",
    type: "movie",
  },
  {
    id: 8,
    title: "The Witcher",
    thumbnail:
      "https://image.tmdb.org/t/p/w500/cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg",
    provider: "netflix",
    type: "tv",
  },
  {
    id: 201,
    title: "Breaking Bad",
    thumbnail: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    provider: "netflix",
    type: "tv",
    progress: 75,
  },
  {
    id: 202,
    title: "The Last of Us",
    thumbnail:
      "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
    provider: "netflix",
    type: "tv",
    progress: 40,
  },
  {
    id: 203,
    title: "Black Mirror",
    thumbnail:
      "https://image.tmdb.org/t/p/w500/5UaYsGZOFhjFDwQh6GuLjjA1WlF.jpg",
    provider: "netflix",
    type: "tv",
    progress: 90,
    badge: "new",
  },
  {
    id: 101,
    title: "Squid Game",
    thumbnail:
      "https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
    provider: "netflix",
    type: "tv",
    match: 97,
  },
  {
    id: 104,
    title: "Wednesday",
    thumbnail:
      "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
    provider: "netflix",
    type: "tv",
    match: 94,
  },
  {
    id: 105,
    title: "Money Heist",
    thumbnail:
      "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
    provider: "netflix",
    type: "tv",
    match: 93,
  },
  {
    id: 106,
    title: "The Queen's Gambit",
    thumbnail:
      "https://image.tmdb.org/t/p/w500/zU0htwkhNvBQdVSIKB9s6hgVeFK.jpg",
    provider: "netflix",
    type: "tv",
    match: 98,
  },
];

const Page = () => {
  const continueWatching = useMemo(() => {
    const shuffled = shuffleArray(trendingContent);
    return shuffled.map((item) => ({
      ...item,
      progress: item.progress || Math.floor(Math.random() * 95) + 5, // Random progress between 5-99%
    }));
  }, []);

  const netflixOriginals = useMemo(() => {
    const shuffled = shuffleArray(trendingContent);
    // Ensure each item has a match value
    return shuffled.map((item) => ({
      ...item,
      match: item.match || Math.floor(Math.random() * 20) + 80, // Random match between 80-99%
    }));


const HLS_DEMO_VIDEO = "https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/manifest/video.m3u8";
const AVATAR_DESCRIPTION = "Set in the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting the world he feels is his home.";

const Page = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [continueWatching, setContinueWatching] = useState<Movie[]>([]);
  const [trendingContent, setTrendingContent] = useState<Movie[]>([]);

  const [netflixOriginals, setNetflixOriginals] = useState<Movie[]>([]);
  const [featuredItem, setFeaturedItem] = useState<Movie | null>(null);

  useEffect(() => {
    const moviesCol = collection(db, "movies");

    async function fetchAllMovies() {
      try {
        const snapshot = await getDocs(moviesCol);
        const fetchedMovies = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as unknown as Movie[];
        setMovies(fetchedMovies);
        if (fetchedMovies.length > 0) {
          setFeaturedItem(fetchedMovies[0]);
          setTrendingContent(fetchedMovies.slice(0, 10))
          setContinueWatching(fetchedMovies.slice(20, 30));
          setNetflixOriginals(fetchedMovies.slice(30, 50)); 
        }
        return fetchedMovies;
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
    fetchAllMovies();
  }, []);



  const heroBannerProps = featuredItem ? {
    id: featuredItem.id,
    title: featuredItem.title,
    description: AVATAR_DESCRIPTION, 
    videoUrl: HLS_DEMO_VIDEO, 
    thumbnailUrl: featuredItem.thumbnail,
  } : {
    id: '',
    title: 'Loading...',
    description: '',
    videoUrl: '',
    thumbnailUrl: '',
  };

  return (
    <div className="netflix-font">
      <Navbar />

      <HeroBanner
        id={heroBannerProps.id}
        title={heroBannerProps.title}
        description={heroBannerProps.description}
        videoUrl={heroBannerProps.videoUrl}
        thumbnailUrl={heroBannerProps.thumbnailUrl}
      />
      <main className='bg-black text-white mx-20'>
        <Carousel title="Trending Now">
          {trendingContent.map((item) => (
            <CarouselItem
              key={item.id}
              id={item.id}
              title={item.title}
              thumbnail={item.thumbnail}
              provider={item.provider}
              // badge={item.badge}
            />
          ))}
        </Carousel>

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
                {50}% Match
              </div>
            </CarouselItem>
          ))}
        </Carousel>
      </main>
    </>
  );
};
      <Footer />
    </div>
  )
}

export default Page;
