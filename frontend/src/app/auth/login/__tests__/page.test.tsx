import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Login from '../page';
import { Auth } from 'firebase/auth';

// Mock next/navigation
const mockRouterPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

// Mock firebase/auth
const mockSignInWithEmailAndPassword = vi.fn();
vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: (auth: Auth, email: string, pass: string) =>
    mockSignInWithEmailAndPassword(auth, email, pass),
}));

// Mock firebase config
vi.mock('../firebase', () => ({
  auth: {},
}));

describe('Login Page', () => {
  it('renders the login form', () => {
    render(<Login />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Hasło')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Zaloguj się' })
    ).toBeInTheDocument();
  });

  it('submits the form with email and password', async () => {
    mockSignInWithEmailAndPassword.mockResolvedValue({
      user: { email: 'test@example.com' },
    });
    render(<Login />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Hasło'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Zaloguj się' }));

    await waitFor(() => {
      expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(
        {},
        'test@example.com',
        'password123'
      );
    });
  });

  it('shows an error message on failed login', async () => {
    mockSignInWithEmailAndPassword.mockRejectedValue(
      new Error('Invalid credentials')
    );
    render(<Login />);

    fireEvent.click(screen.getByRole('button', { name: 'Zaloguj się' }));

    await waitFor(() => {
      expect(
        screen.getByText('Błąd logowania: Sprawdź dane logowania.')
      ).toBeInTheDocument();
    });
  });
});
