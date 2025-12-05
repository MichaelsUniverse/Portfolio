import { render, screen, waitFor } from '@testing-library/react';
import { Projects } from '../pages/Projects/Projects';
import { ProjectDetails } from '../pages/Projects/projectDetails';
import { createMockLocalStorage } from './test-helpers';
import { useParams } from 'react-router-dom';

// Mock the API URL config
jest.mock('../config/api', () => ({
  apiUrl: 'http://localhost:3000/api'
}));

const mockNavigate = jest.fn();

// Mock the router hook
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: jest.fn()
}));

describe('Project List', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    mockNavigate.mockClear();

    Object.defineProperty(window, 'localStorage', {
      value: createMockLocalStorage(),
      writable: true
    });

    // CRITICAL: We must set a token, otherwise the component redirects to login immediately
    window.localStorage.setItem('token', 'test-token-123');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Shows no Projects', async () => {
    // Mock an empty array response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });

    render(<Projects />);

    // 1. Verify fetch was called with the correct Authorization header
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/projects', expect.objectContaining({
        headers: expect.objectContaining({
            'Authorization': 'Bearer test-token-123'
        })
      }));
    });

    // 2. Verify the static footer text appears (confirming the page rendered)
    // We expect this because your component always shows "More Projects TBA"
    expect(screen.getByText(/More Projects TBA/i)).toBeInTheDocument();

    // 3. Verify the "New Project" button is present
    expect(screen.getByRole('button', { name: /New Project/i })).toBeInTheDocument();
  });

  test('Renders Projects', async () => {
    const mockProjects = [
      {
        _id: '1',
        title: 'REST API',
        description: 'An api',
        techStack: 'Node.js, Express, MongoDB',
        link: '',
        repo: ''
      },
      {
        _id: '2',
        title: 'Finance Tracker',
        description: 'React based budget app',
        techStack: 'Node.js, MongoDB, React',
        link: '',
        repo: ''
      }
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProjects
    });

    render(<Projects />);

    // Wait for the data to appear on screen
    expect(await screen.findByText('REST API')).toBeInTheDocument();

    // Verify both projects are rendered
    expect(screen.getByText('An api')).toBeInTheDocument();
    expect(screen.getByText('Finance Tracker')).toBeInTheDocument();
    expect(screen.getByText('React based budget app')).toBeInTheDocument();
  });

  test('Create Project when no id', () => {

    // Mock useParams to return no id
    useParams.mockReturnValue({ id: undefined});

    render(<ProjectDetails />);

    // Verify that the form fields are empty for creating new education
    expect(screen.getByLabelText(/Title/i).value).toBe('');
    expect(screen.getByLabelText(/Description/i).value).toBe('');
    expect(screen.getByLabelText(/Tech Stack/i).value).toBe('');
    expect(screen.getByLabelText(/Link/i).value).toBe('');
    expect(screen.getByLabelText(/Repo/i).value).toBe('');
  });

  test('Edit Project when id present', async () => {
    // Mock useParams to return an id
    useParams.mockReturnValue({ id: '1' });

    const project = {
      _id: '1',
      title: 'REST API',
      description: 'An api',
      techStack: 'Node.js, Express, MongoDB',
      link: '',
      repo: ''
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({project})
    });


    render(<ProjectDetails />);

    // Wait for the data to load into the form
    expect(await screen.findByDisplayValue(/REST API/i)).toBeInTheDocument();

    // Verify that the form fields are populated for editing existing education
    expect(screen.getByLabelText(/Title/i)).toHaveValue('REST API');
    expect(screen.getByLabelText(/Description/i)).toHaveValue('An api');
    expect(screen.getByLabelText(/Tech Stack/i)).toHaveValue('Node.js, Express, MongoDB');
    expect(screen.getByLabelText(/Link/i)).toHaveValue('');
    expect(screen.getByLabelText(/Repo/i)).toHaveValue('');
  });
});