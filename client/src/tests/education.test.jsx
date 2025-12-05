import { render, screen, waitFor } from '@testing-library/react';
import { Education } from '../pages/Education/Education';
import { EducationDetails } from '../pages/Education/educationDetails';
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

describe('Education', () => {
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

  test('Shows no Education', async () => {
    // Mock an empty array response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });

    render(<Education />);

    // 1. Verify fetch was called with the correct Authorization header
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/education', expect.objectContaining({
        headers: expect.objectContaining({
            'Authorization': 'Bearer test-token-123'
        })
      }));
    });

    // 2. Verify the "New Education" button is present
    expect(screen.getByRole('button', { name: /New Education/i })).toBeInTheDocument();
  });

  test('Renders Educations', async () => {
    const mockEducations = [
      {
        _id: '1',
        title: 'Computer Programming',
        degree: 'Bachelor',
        school: 'Tech University',
        gpa: '4.2/4.5',
        color: "#251d68",
        startDate: '2025-01-04T00:00:00.000+00:00',
        endDate: null,
        estend: '2027-12-12T00:00:00.000+00:00',
      },
      {
        _id: '2',
        title: 'Art',
        degree: 'Certificate',
        school: 'Artisan McArt',
        gpa: '',
        color: "#79ed23",
        startDate: '2025-01-04T00:00:00.000+00:00',
        endDate: '2025-12-04T00:00:00.000+00:00',
        estend: null
      }
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockEducations
    });

    render(<Education />);

    // Wait for the data to appear on screen
    expect(await screen.findByText('Computer Programming')).toBeInTheDocument();

    // Verify both projects are rendered
    expect(screen.getByText('Bachelor')).toBeInTheDocument();
    expect(screen.getByText('Tech University')).toBeInTheDocument();
    expect(screen.getByText('GPA: 4.2/4.5')).toBeInTheDocument();
    expect(screen.getByText('Jan 2025 - Current')).toBeInTheDocument();
    expect(screen.getByText('End: Dec 2027')).toBeInTheDocument();


    expect(screen.getByText('Art')).toBeInTheDocument();
    expect(screen.getByText('Certificate')).toBeInTheDocument();
    expect(screen.getByText('Artisan McArt')).toBeInTheDocument();
    expect(screen.queryByText('Jan 2025 - Dec 2025')).toBeInTheDocument();

  });

  test('Create Education when no id', () => {

    // Mock useParams to return no id
    useParams.mockReturnValue({ id: undefined});

    render(<EducationDetails />);

    // Verify that the form fields are empty for creating new education
    expect(screen.getByLabelText(/Title/i).value).toBe('');
    expect(screen.getByLabelText(/Degree/i).value).toBe('');
    expect(screen.getByLabelText(/School/i).value).toBe('');
    expect(screen.getByLabelText(/GPA/i).value).toBe('');
    expect(screen.getByLabelText(/Start Date/i).value).toBe('');
    expect(screen.getByLabelText("End Date").value).toBe('');
    expect(screen.getByLabelText(/Estimated End Date/i).value).toBe('');
    expect(screen.getByLabelText(/Color/i).value).toBe('#000000');
    expect(screen.getByRole('button', { name: /Create/i })).toBeInTheDocument();
  });

  test('Edit Education when id present', async () => {
    // Mock useParams to return an id
    useParams.mockReturnValue({ id: '123' });

    const foundEducation = {
      _id: '1',
      title: 'Computer Programming',
      degree: 'Bachelor',
      school: 'Tech University',
      gpa: '4.2/4.5',
      color: "#251d68",
      startDate: '2025-01-04T00:00:00.000+00:00',
      endDate: null,
      estend: '2027-12-12T00:00:00.000+00:00',
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => foundEducation
    });


    render(<EducationDetails />);

    // Wait for the data to load into the form
    expect(await screen.findByDisplayValue(/Computer Programming/i)).toBeInTheDocument();

    // Verify that the form fields are populated for editing existing education
    expect(screen.getByLabelText(/Title/i)).toHaveValue('Computer Programming');
    expect(screen.getByLabelText(/Degree/i).value).toBe('Bachelor');
    expect(screen.getByLabelText(/School/i).value).toBe('Tech University');
    expect(screen.getByLabelText(/GPA/i).value).toBe('4.2/4.5');
    expect(screen.getByLabelText(/Start Date/i).value).toBe('2025-01-04');
    expect(screen.getByLabelText("End Date").value).toBe('');
    expect(screen.getByLabelText(/Estimated End Date/i).value).toBe('2027-12-12');
    expect(screen.getByLabelText(/Color/i).value).toBe('#251d68');
    expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument();
  });
});