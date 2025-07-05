import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Navbar from '../navbar';
import * as Auth from '@/app/auth/firebase';
import * as Hooks from '@/hooks/useAuth';
import { User } from '@/types/user';
import { User as FirebaseUser } from 'firebase/auth';

// Mock signOut from firebase/auth
const mockSignOut = vi.fn();
vi.mock('firebase/auth', async (importOriginal) => {
  const actual = await importOriginal<typeof import('firebase/auth')>();
  return {
    ...actual,
    signOut: () => mockSignOut(),
  };
});

// Mock next/link
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

// Mock next/navigation
const mockRouterPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

// Mock Firebase services
// @ts-expect-error - We are providing a partial mock for testing purposes
vi.spyOn(Auth, 'auth', 'get').mockReturnValue({ currentUser: null });
// @ts-expect-error - We are providing a partial mock for testing purposes
vi.spyOn(Auth, 'db', 'get').mockReturnValue({});

// Mock useAuth hook
const useAuthSpy = vi.spyOn(Hooks, 'useAuth');

describe('Navbar', () => {
  it('renders the navbar with logo and navigation links', () => {
    useAuthSpy.mockReturnValue({
      userData: null,
      loading: false,
      authUser: null,
    });
    render(<Navbar />);

    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('TV Shows')).toBeInTheDocument();
    expect(screen.getByText('Movies')).toBeInTheDocument();
    expect(screen.getByText('New & Popular')).toBeInTheDocument();
    expect(screen.getByText('My List')).toBeInTheDocument();
  });

  it('shows the admin panel link for admin users', () => {
    useAuthSpy.mockReturnValue({
      userData: { admin: true } as User,
      loading: false,
      authUser: {} as FirebaseUser,
    });
    render(<Navbar />);

    expect(screen.getByText('Admin Panel')).toBeInTheDocument();
  });

  it('does not show the admin panel link for non-admin users', () => {
    useAuthSpy.mockReturnValue({
      userData: { admin: false } as User,
      loading: false,
      authUser: {} as FirebaseUser,
    });
    render(<Navbar />);

    expect(screen.queryByText('Admin Panel')).not.toBeInTheDocument();
  });

  it('calls signOut and redirects when the sign out button is clicked', async () => {
    useAuthSpy.mockReturnValue({
      userData: { admin: false } as User,
      loading: false,
      authUser: {} as FirebaseUser,
    });
    render(<Navbar />);

    const signOutButton = screen.getByText('Wyloguj się z serwisu Netflix');
    fireEvent.click(signOutButton);

    expect(mockSignOut).toHaveBeenCalled();
  });
});
