"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Bell, ChevronDown } from "lucide-react";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${
        isScrolled
          ? "bg-black"
          : "bg-gradient-to-b from-black/80 to-transparent"
      } fixed top-0 z-50 w-full transition-all duration-500`}
    >
      <div className="flex items-center justify-between px-4 md:px-10 py-4">
        {/* Left section - Logo and Navigation */}
        <div className="flex items-center space-x-8">
          {/* Netflix Logo */}
          <Link href="/browse" className="cursor-pointer">
            <svg
              viewBox="0 0 111 30"
              className="h-6 w-20 md:h-8 md:w-28 fill-[#e50914]"
              aria-hidden="true"
              focusable="false"
            >
              <g>
                <path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"></path>
              </g>
            </svg>
          </Link>

          {/* Navigation menu */}
          <div className="hidden md:flex space-x-4">
            <Link
              href="/browse"
              className="text-white hover:text-gray-300 text-sm font-light"
            >
              Home
            </Link>
            <Link
              href="/browse/tv-shows"
              className="text-white hover:text-gray-300 text-sm font-light"
            >
              TV Shows
            </Link>
            <Link
              href="/browse/movies"
              className="text-white hover:text-gray-300 text-sm font-light"
            >
              Movies
            </Link>
            <Link
              href="/browse/new-popular"
              className="text-white hover:text-gray-300 text-sm font-light"
            >
              New & Popular
            </Link>
            <Link
              href="/browse/my-list"
              className="text-white hover:text-gray-300 text-sm font-light"
            >
              My List
            </Link>
          </div>
        </div>

        {/* Right section - Search, Notifications, Profile */}
        <div className="flex items-center space-x-4">
          <Search className="h-6 w-6 text-white cursor-pointer hover:text-gray-300 transition-colors" />

          <div className="hidden md:inline">
            <Bell className="h-6 w-6 text-white cursor-pointer hover:text-gray-300 transition-colors" />
          </div>

          {/* Profile dropdown */}
          <div className="flex items-center space-x-2 cursor-pointer group">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt="Profile"
              width={10}
              height={10}
              className="rounded-sm h-8 w-8"
            />
            <ChevronDown className="h-4 w-4 text-white group-hover:rotate-180 transition duration-300" />

            {/* Dropdown content - hidden by default, shown on hover */}
            <div className="absolute top-12 right-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-black/90 border border-gray-700 p-4 rounded-md">
              <div className="flex flex-col space-y-3 min-w-[180px]">
                <div className="border-b border-gray-700 pb-2">
                  <Link
                    href="/account/acchoose"
                    className="text-white hover:underline text-sm"
                  >
                    Manage Profiles
                  </Link>
                </div>
                <Link
                  href="/account"
                  className="text-white hover:underline text-sm"
                >
                  Account
                </Link>
                <Link
                  href="/help"
                  className="text-white hover:underline text-sm"
                >
                  Help Center
                </Link>
                <button className="text-white text-left hover:underline text-sm">
                  Sign out of Netflix
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
