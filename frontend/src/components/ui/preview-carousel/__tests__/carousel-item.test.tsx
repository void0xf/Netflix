import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CarouselItem from '../carousel-item';

const mockRouterPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

const defaultProps = {
  title: 'Test Item',
  thumbnail: '/thumb.jpg',
  videoUrl: 'http://www.youtube.com/watch?v=test-video-id',
};

describe('CarouselItem', () => {
  it('renders the title and thumbnail', () => {
    render(<CarouselItem {...defaultProps} />);

    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByAltText('Test Item')).toBeInTheDocument();
  });

  it('navigates to the correct video URL on click', () => {
    render(<CarouselItem {...defaultProps} />);

    fireEvent.click(screen.getByText('Test Item'));
    expect(mockRouterPush).toHaveBeenCalledWith('/video/test-video-id');
  });

  it('renders a badge when provided', () => {
    render(<CarouselItem {...defaultProps} badge='New' />);

    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders children when provided', () => {
    render(
      <CarouselItem {...defaultProps}>
        <div>Child Content</div>
      </CarouselItem>
    );

    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });
});
