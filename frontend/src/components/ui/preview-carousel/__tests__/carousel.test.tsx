import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Carousel from '../carousel';
import CarouselItem from '../carousel-item';

const mockItems = [
  { id: 1, title: 'Item 1', thumbnail: '/thumb1.jpg' },
  { id: 2, title: 'Item 2', thumbnail: '/thumb2.jpg' },
  { id: 3, title: 'Item 3', thumbnail: '/thumb3.jpg' },
  { id: 4, title: 'Item 4', thumbnail: '/thumb4.jpg' },
  { id: 5, title: 'Item 5', thumbnail: '/thumb5.jpg' },
  { id: 6, title: 'Item 6', thumbnail: '/thumb6.jpg' },
];

describe('Carousel', () => {
  it('renders the title and children', () => {
    render(
      <Carousel title='Test Carousel'>
        {mockItems.map((item) => (
          <CarouselItem key={item.id} {...item} />
        ))}
      </Carousel>
    );

    expect(screen.getByText('Test Carousel')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 6')).toBeInTheDocument();
  });

  it('shows and hides scroll arrows correctly', () => {
    render(
      <Carousel title='Test Carousel'>
        {mockItems.map((item) => (
          <CarouselItem key={item.id} {...item} />
        ))}
      </Carousel>
    );

    const scrollContainer = screen.getByRole('button', {
      name: /Scroll right/i,
    }).parentElement as HTMLElement;

    // Initially, only the right arrow should be visible
    expect(
      screen.getByRole('button', { name: /Scroll right/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Scroll left/i })
    ).not.toBeInTheDocument();

    // Simulate scrolling to the right
    fireEvent.scroll(scrollContainer, { target: { scrollLeft: 100 } });

    // Both arrows should now be visible
    expect(
      screen.getByRole('button', { name: /Scroll right/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Scroll left/i })
    ).toBeInTheDocument();
  });
});
