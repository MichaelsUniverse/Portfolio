import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Contact } from '../pages/Contact/Contact'; // Adjust path if necessary
import { createMockLocalStorage } from './test-helpers';

// Mock the API URL config
jest.mock('../config/api', () => ({
  apiUrl: 'http://localhost:3000/api'
}));

const mockNavigate = jest.fn();

// Mock the router hook
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}));

describe('Contact Page', () => {
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

  test('Redirects to login', () => {
    window.localStorage.removeItem('token');

    render(<Contact />);

    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  test('Submits contact form successfully', async () => {
    window.localStorage.setItem('token', 'test-token-123');

    const formData = {
        name: 'John Doe',
        email: 'john@email.com',
        message: 'Hello, I would like to hire you.'
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ contact: formData })
    });

    render(<Contact />);

    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const messageInput = screen.getByLabelText(/Message/i);
    const submitBtn = screen.getByRole('button', { name: /Send/i });


    fireEvent.change(nameInput, { target: { name: 'name', value: formData.name } });
    fireEvent.change(emailInput, { target: { name: 'email', value: formData.email } });
    fireEvent.change(messageInput, { target: { name: 'message', value: formData.message } });

    fireEvent.click(submitBtn);

    // 6. Assertions
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/contacts', expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-token-123'
        }),
        body: JSON.stringify(formData)
      }));
    });

    // Should redirect to home on success
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});