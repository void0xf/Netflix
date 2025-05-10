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
                  style={{ width: `${50}%` }}
                />
              </div>
            </CarouselItem>
          ))}
        </Carousel>
        
        <Carousel title="Netflix Originals" >
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
      <Footer />
    </div>
  )
}

export default Page;
