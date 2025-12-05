import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Login } from '../pages/Login/login';
import { Nav } from '../components/Nav';
import { createMockLocalStorage } from './test-helpers';
import { useLocation } from 'react-router-dom';

jest.mock('../config/api', () => ({
  apiUrl: 'http://localhost:3000/api'
}));

const mockNavigate = jest.fn();

// Mock the router hook to verify redirects.
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>,
  useLocation: () => ({ pathname: '/' })
}));

describe('Auth Tests', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    mockNavigate.mockClear();

    Object.defineProperty(window, 'localStorage', {
      value: createMockLocalStorage(),
      writable: true
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const loginDetails = {
      email: "student@test.com",
      password: "Password@123",
      token: "token123"
  }

  test('Login', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        token: loginDetails.token,
        user: {
          email: loginDetails.email
        }
      })
    });

    render(<Login />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    // Step 1: simulate the user typing.
    fireEvent.change(emailInput, { target: { name: 'email', value: loginDetails.email } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: loginDetails.password } });

    expect(emailInput).toHaveValue(loginDetails.email);
    expect(passwordInput).toHaveValue(loginDetails.password);

    // Step 2: submit the form and wait for the mocked API call.
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/auth/login', expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          email: loginDetails.email,
          password: loginDetails.password
        })
      }));
    });

    expect(window.localStorage.setItem).toHaveBeenCalledWith('token', loginDetails.token);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('email', loginDetails.email);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('Sign Up', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          token: 'token-123',
          user: {
              email: 'newuser@test.com'
          }
        })
      });

      render(<Login />);

      // 1. Find the Sign Up button
      const signupButton = screen.getByRole('button', { name: /sign up/i });

      // 2. Click it once to toggle the form to "Sign Up" mode
      fireEvent.click(signupButton);

      // 3. Verify the "Username" input has appeared
      const nameInput = screen.getByLabelText(/username/i);
      expect(nameInput).toBeInTheDocument();

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      // 4. Fill out the form (Name, Email, Password)
      fireEvent.change(nameInput, { target: { name: 'name', value: 'New User' } });
      fireEvent.change(emailInput, { target: { name: 'email', value: 'newuser@test.com' } });
      fireEvent.change(passwordInput, { target: { name: 'password', value: 'Password@123' } });

      // 5. Click "Sign Up" again to submit
      fireEvent.click(signupButton);

      // 6. Assertions
      await waitFor(() => {
        // Check correct API endpoint for register
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/auth/register', expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
              name: 'New User',
              email: 'newuser@test.com',
              password: 'Password@123'
          })
        }));
      });

      // Check storage and redirection
      expect(window.localStorage.setItem).toHaveBeenCalledWith('token', 'token-123');
      expect(window.localStorage.setItem).toHaveBeenCalledWith('email', 'newuser@test.com');
      expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('Logout', () => {
    window.localStorage.setItem('token', 'token-123');
    window.localStorage.setItem('email', 'email@email.com');

    render(<Nav />);

    const logout = screen.getByText(/Logout/i);
    fireEvent.click(logout);

    expect(window.localStorage.getItem('token')).toBeNull();
    expect(window.localStorage.getItem('email')).toBeNull();

    // Verify redirection to home
    expect(logout).toHaveAttribute('href', '/');
  });
});