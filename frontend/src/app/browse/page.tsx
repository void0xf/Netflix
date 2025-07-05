"use client"
import Carousel from '@/components/ui/preview-carousel/carousel';
import Navbar from '@/features/browse/navbar';
import Footer from '@/features/browse/footer';
import React, { useEffect, useState } from 'react'
import HeroBanner from '@/components/ui/hero-banner/hero-banner';
import './netflix-fonts.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../auth/firebase';

import { Movie } from '@/types/movie';
import CarouselItem from '@/components/ui/preview-carousel/carousel-item';

function pseudoRandom(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  hash = Math.abs(hash);
  return (hash % 1000) / 1000;
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}


const HLS_DEMO_VIDEO = "https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/manifest/video.m3u8";
const AVATAR_DESCRIPTION = "Set in the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting the world he feels is his home.";

const Page = () => {
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
          ...doc.data(),
          id: doc.id
        })) as unknown as Movie[];
        
        const shuffledMovies = shuffleArray(fetchedMovies);

        if (shuffledMovies.length > 0) {
          setFeaturedItem(shuffledMovies[0]);
          
          setTrendingContent(shuffledMovies.slice(0, 10));
          
          const continueWatchingMovies = shuffledMovies.slice(10, 20).map(movie => ({
            ...movie,
            progress: Math.floor(pseudoRandom(String(movie.id)) * 95) + 5,
          }));
          setContinueWatching(continueWatchingMovies);
          
          const netflixOriginalsMovies = shuffledMovies.slice(20, 30).map(movie => ({
            ...movie,
            match: Math.floor(pseudoRandom(String(movie.id)) * 20) + 80,
          }));
          setNetflixOriginals(netflixOriginalsMovies); 
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
          {trendingContent.map((item: Movie) => (
            <CarouselItem
              key={item.id}
              id={item.id}
              title={item.title}
              thumbnail={item.thumbnail}
              provider={item.provider}
            />
          ))}
        </Carousel>

        <Carousel title="Continue Watching" showTitleArrow={true}>
          {continueWatching.map((item: Movie) => (
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
          {netflixOriginals.map((item: Movie) => (
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
    <div>
      <Footer />
    </div>  
    </div>
  );
};

export default Page;
