'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { auth, db } from '@/app/auth/firebase';
import { UserProfile } from '@/types/userProfile';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const { userData } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const profileData = localStorage.getItem('selectedProfile');
    if (profileData) {
      setSelectedProfile(JSON.parse(profileData));
    }

    const fetchProfiles = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const accSnap = await getDocs(
          collection(db, 'users', currentUser.uid, 'accounts')
        );
        const accList = accSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as UserProfile[];
        setProfiles(accList);
      }
    };

    fetchProfiles();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('selectedProfile');
      router.push('/auth/authPage');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const switchProfile = (profile: UserProfile) => {
    localStorage.setItem('selectedProfile', JSON.stringify(profile));
    setSelectedProfile(profile);
    // You might want to reload the page or navigate to reflect the profile change
    window.location.reload();
  };

  return (
    <header
      className={`${
        isScrolled
          ? 'bg-black'
          : 'bg-gradient-to-b from-black/80 to-transparent'
      } fixed top-0 z-50 w-full transition-all duration-500`}
    >
      <div className='flex items-center justify-between mx-8 md:px-10 py-4'>
        {/* Left section - Logo and Navigation */}
        <div className='flex items-center space-x-8'>
          {/* Netflix Logo */}
          <Link href='/browse' className='cursor-pointer'>
            <img
              src='/logo-no-background.png'
              alt='Logo'
              style={{ height: 50 }}
            />
          </Link>

          {/* Navigation menu */}
          <div className='hidden md:flex space-x-4'>
            <Link
              href='/browse'
              className='text-white hover:text-gray-300 text-sm font-light'
            >
              Home
            </Link>
            <Link
              href='/browse/tv-shows'
              className='text-white hover:text-gray-300 text-sm font-light'
            >
              TV Shows
            </Link>
            <Link
              href='/browse/movies'
              className='text-white hover:text-gray-300 text-sm font-light'
            >
              Movies
            </Link>
            <Link
              href='/browse/new-popular'
              className='text-white hover:text-gray-300 text-sm font-light'
            >
              New & Popular
            </Link>
            <Link
              href='/browse/my-list'
              className='text-white hover:text-gray-300 text-sm font-light'
            >
              My List
            </Link>
          </div>
        </div>

        {/* Right section - Search, Notifications, Profile */}
        <div className='flex items-center space-x-4'>
          <Search className='h-6 w-6 text-white cursor-pointer hover:text-gray-300 transition-colors' />

          <div className='hidden md:inline'>
            <Bell className='h-6 w-6 text-white cursor-pointer hover:text-gray-300 transition-colors' />
          </div>

          {/* Profile dropdown */}
          <div className='flex items-center space-x-2 cursor-pointer group'>
            <Image
              src={
                selectedProfile
                  ? `/profiles/${selectedProfile.img_id}.png`
                  : '/profiles/0.png'
              }
              alt='Profile'
              width={32}
              height={32}
              className='rounded-sm h-8 w-8 object-cover'
            />
            <ChevronDown className='h-4 w-4 text-white group-hover:rotate-180 transition duration-300' />

            {/* Dropdown content - hidden by default, shown on hover */}
            <div className='absolute top-12 right-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-black/90 border border-gray-700 p-2 rounded-md'>
              <div className='flex flex-col space-y-2 min-w-[200px]'>
                {profiles.map(
                  (profile) =>
                    profile.id !== selectedProfile?.id && (
                      <div
                        key={profile.id}
                        onClick={() => switchProfile(profile)}
                        className='flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md'
                      >
                        <Image
                          src={`/profiles/${profile.img_id}.png`}
                          alt={profile.nazwaKonta}
                          width={32}
                          height={32}
                          className='rounded-sm h-8 w-8 object-cover'
                        />
                        <span className='text-white text-sm'>
                          {profile.nazwaKonta}
                        </span>
                      </div>
                    )
                )}
                <div className='border-t border-gray-600 my-1'></div>
                {userData?.admin && (
                  <Link
                    href='/admin'
                    className='text-white hover:underline text-sm p-2 flex items-center justify-center'
                  >
                    Admin Panel
                  </Link>
                )}
                <Link
                  href='/account/acchoose'
                  className='text-white hover:underline text-sm p-2 flex items-center justify-center'
                >
                  Zarządzaj profilami
                </Link>
                <Link
                  href='/account'
                  className='text-white hover:underline text-sm p-2'
                >
                  Konto
                </Link>
                <Link
                  href='/help'
                  className='text-white hover:underline text-sm p-2'
                >
                  Centrum pomocy
                </Link>
                <button
                  onClick={handleSignOut}
                  className='text-white text-left hover:underline text-sm p-2 border-t border-gray-600 mt-1'
                >
                  Wyloguj się z serwisu Netflix
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
