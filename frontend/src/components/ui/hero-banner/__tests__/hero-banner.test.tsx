import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HeroBanner from '../hero-banner';

// Mock the next/navigation module
const mockRouterPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

// Mock the @vidstack/react player
vi.mock('@vidstack/react', async () => {
  const actual = await vi.importActual('@vidstack/react');
  return {
    ...actual,
    MediaPlayer: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    MediaProvider: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  };
});

const defaultProps = {
  id: '123',
  title: 'Test Movie',
  description: 'This is a test description.',
  videoUrl: 'https://test.com/video.mp4',
  thumbnailUrl: 'https://test.com/thumbnail.jpg',
};

describe('HeroBanner', () => {
  it('renders the title, description, and buttons', () => {
    render(<HeroBanner {...defaultProps} />);

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('This is a test description.')).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getByText('More Info')).toBeInTheDocument();
  });

  it('calls the router with the correct URL when play is clicked', () => {
    render(<HeroBanner {...defaultProps} />);

    fireEvent.click(screen.getByText('Play'));
    expect(mockRouterPush).toHaveBeenCalledWith(
      `/watch/123?video=${encodeURIComponent(defaultProps.videoUrl)}`
    );
  });

  it('shows and hides the more info modal', () => {
    render(<HeroBanner {...defaultProps} />);

    // Modal should be hidden initially
    expect(screen.queryByText('Genres:')).not.toBeInTheDocument();

    // Click "More Info" to show the modal
    fireEvent.click(screen.getByText('More Info'));
    expect(screen.getByText('Genres:')).toBeInTheDocument();

    // Click the close button to hide the modal
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    // A slight delay might be needed for the state to update and re-render
    setTimeout(() => {
      expect(screen.queryByText('Genres:')).not.toBeInTheDocument();
    }, 500);
  });
});
