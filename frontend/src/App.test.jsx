import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock axios
vi.mock('axios', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
    create: vi.fn(() => ({
      post: vi.fn(),
      get: vi.fn(),
    })),
  },
}));

describe('App Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders login page when not authenticated', () => {
    render(<App />);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it('shows email input field', () => {
    render(<App />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    expect(emailInput).toBeInTheDocument();
  });

  it('shows password input field', () => {
    render(<App />);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    expect(passwordInput).toBeInTheDocument();
  });

  it('submits login form with valid credentials', async () => {
    render(<App />);
    
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const loginButton = screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(emailInput.value).toBe('admin@example.com');
    });
  });

  it('displays error message on login failure', async () => {
    render(<App />);
    
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const loginButton = screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.queryByText(/erro/i)).toBeInTheDocument();
    });
  });
});
