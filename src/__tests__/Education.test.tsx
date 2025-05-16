import { render, screen } from '@testing-library/react';

import { Education } from '../components/Education';

describe('Education', () => {
  beforeEach(() => {
    // Mock IntersectionObserver
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  test('renders section title correctly', () => {
    render(<Education />);
    expect(screen.getByText('Educational Background')).toBeInTheDocument();
    expect(
      screen.getByText(
        'My academic journey and qualifications that have shaped my expertise',
      ),
    ).toBeInTheDocument();
  });

  test('renders education information correctly', () => {
    render(<Education />);

    expect(
      screen.getByText('University of Applied Sciences FHDW Bielefeld'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Bachelor of Science (B.Sc) in Wirtschaftsinformatik'),
    ).toBeInTheDocument();
    expect(screen.getByText('2010 - 2014')).toBeInTheDocument();
  });

  test('renders subjects list correctly', () => {
    render(<Education />);

    expect(screen.getByText('Key Courses & Subjects')).toBeInTheDocument();
    expect(screen.getByText('Wirtschaftsinformatik')).toBeInTheDocument();
    expect(screen.getByText('Wirtschaftsmathematik')).toBeInTheDocument();
    expect(screen.getByText('Business English')).toBeInTheDocument();
    expect(screen.getByText('Project Management')).toBeInTheDocument();
  });

  test('renders quote section', () => {
    render(<Education />);

    expect(
      screen.getByText(
        'Education is not the learning of facts, but the training of the mind to think.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('- Albert Einstein')).toBeInTheDocument();
  });

  test('handles intersection observer for animation', () => {
    const observeMock = jest.fn();

    // Create mock IntersectionObserver
    window.IntersectionObserver = jest.fn().mockImplementation(_ => {
      return {
        observe: observeMock,
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      };
    });

    const { container } = render(<Education />);

    // Verify IntersectionObserver was initialized and observe was called
    expect(observeMock).toHaveBeenCalled();

    // Find the education section
    const educationSection = container.querySelector('#education');
    expect(educationSection).toBeInTheDocument();
  });
});
