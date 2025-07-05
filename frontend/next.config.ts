import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enable React strict mode for development
  images: {
    domains: ['image.tmdb.org', 'upload.wikimedia.org'], // Add domains for next/image here, e.g. ['images.example.com']
  },
};

export default nextConfig;
