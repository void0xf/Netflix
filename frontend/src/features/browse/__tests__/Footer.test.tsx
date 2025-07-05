import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Footer from '../footer';

// Mock the next/link component
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

describe('Footer', () => {
  it('renders the footer with social media links', () => {
    render(<Footer />);

    expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
    expect(screen.getByLabelText('YouTube')).toBeInTheDocument();
  });

  it('renders the footer with navigation links', () => {
    render(<Footer />);

    expect(screen.getByText('Audio Description')).toBeInTheDocument();
    expect(screen.getByText('Investor Relations')).toBeInTheDocument();
    expect(screen.getByText('Legal Notices')).toBeInTheDocument();
    expect(screen.getByText('Help Center')).toBeInTheDocument();
    expect(screen.getByText('Jobs')).toBeInTheDocument();
    expect(screen.getByText('Cookie Preferences')).toBeInTheDocument();
    expect(screen.getByText('Gift Cards')).toBeInTheDocument();
    expect(screen.getByText('Terms of Use')).toBeInTheDocument();
    expect(screen.getByText('Corporate Information')).toBeInTheDocument();
    expect(screen.getByText('Media Center')).toBeInTheDocument();
    expect(screen.getByText('Privacy')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  it('renders the service code button', () => {
    render(<Footer />);

    expect(screen.getByText('Service Code')).toBeInTheDocument();
  });

  it('renders the copyright notice with the current year', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    const copyrightText = `© ${currentYear} Netflix Clone. All rights reserved.`;
    expect(screen.getByText(copyrightText)).toBeInTheDocument();
  });
});
