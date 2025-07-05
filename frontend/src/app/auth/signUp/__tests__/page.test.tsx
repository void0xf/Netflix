import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SignUp from '../page';
import { Auth } from 'firebase/auth';

// Mock firebase/auth
const mockCreateUserWithEmailAndPassword = vi.fn();
vi.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: (auth: Auth, email: string, pass: string) =>
    mockCreateUserWithEmailAndPassword(auth, email, pass),
}));

// Mock firebase/firestore
const mockWriteBatch = vi.fn(() => ({
  set: vi.fn(),
  commit: vi.fn(),
}));
vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  collection: vi.fn(),
  writeBatch: () => mockWriteBatch(),
}));

// Mock firebase config
vi.mock('../firebase', () => ({
  auth: {},
  db: {},
}));

describe('SignUp Page', () => {
  it('renders the signup form', () => {
    render(<SignUp />);
    expect(screen.getByLabelText('Imię')).toBeInTheDocument();
    expect(screen.getByLabelText('Nazwisko')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Hasło')).toBeInTheDocument();
    expect(screen.getByLabelText('Potwierdź hasło')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Zarejestruj się' })
    ).toBeInTheDocument();
  });

  it('shows an error if passwords do not match', async () => {
    render(<SignUp />);
    fireEvent.change(screen.getByLabelText('Hasło'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText('Potwierdź hasło'), {
      target: { value: 'password456' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Zarejestruj się' }));

    await waitFor(() => {
      expect(
        screen.getByText('Błąd rejestracji: hasła nie są takie same')
      ).toBeInTheDocument();
    });
  });

  it('submits the form with valid data', async () => {
    mockCreateUserWithEmailAndPassword.mockResolvedValue({
      user: { uid: '123' },
    });
    render(<SignUp />);

    fireEvent.change(screen.getByLabelText('Imię'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText('Nazwisko'), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Hasło'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText('Potwierdź hasło'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Zarejestruj się' }));

    await waitFor(() => {
      expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalled();
      expect(mockWriteBatch().commit).toHaveBeenCalled();
    });
  });
});
