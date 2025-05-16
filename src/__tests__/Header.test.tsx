import { fireEvent, render, screen } from '@testing-library/react';

import { Header } from '../components/Header';

// Mock the ScrollIndicator component
jest.mock('../components/ScrollIndicator', () => ({
  ScrollIndicator: () => <div data-testid="scroll-indicator-mock" />,
}));

describe('Header', () => {
  // Store original window.location implementation
  const originalLocation = window.location;

  beforeEach(() => {
    // Mock window.location.hash setter
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: {
        ...originalLocation,
        // Add a custom hash setter that includes the # character
        set hash(value) {
          this._hash = value.startsWith('#') ? value : `#${value}`;
        },
        get hash() {
          return this._hash || '';
        },
        _hash: '',
      },
    });
  });

  afterEach(() => {
    // Restore original window.location
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
    });
  });

  test('renders hero section with correct name and title', () => {
    render(<Header />);
    expect(screen.getByText("I'm")).toBeInTheDocument();
    expect(screen.getByText('Ramiz')).toBeInTheDocument();
    expect(screen.getByText('WELCOME TO MY PORTFOLIO')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Senior Full-Stack Software Engineer crafting elegant solutions to complex problems',
      ),
    ).toBeInTheDocument();
  });

  test('renders social media links', () => {
    render(<Header />);

    // Check for the presence of social media links (3 links expected)
    const socialLinks = screen.getAllByRole('link');
    expect(socialLinks.length).toBeGreaterThanOrEqual(5); // Social links + main action buttons
  });

  test('renders call-to-action buttons', () => {
    render(<Header />);

    expect(screen.getByText('Contact Me')).toBeInTheDocument();
    expect(screen.getByText('View My Skills')).toBeInTheDocument();
  });

  test('scrolls to contact section when contact button is clicked', () => {
    render(<Header />);

    const contactButton = screen.getByText('Contact Me');
    fireEvent.click(contactButton);

    // Check if hash is updated correctly
    expect(window.location.hash).toBe('#contact');
  });

  test('scrolls to skills section when skills button is clicked', () => {
    render(<Header />);

    const skillsButton = screen.getByText('View My Skills');
    fireEvent.click(skillsButton);

    // Check if hash is updated correctly
    expect(window.location.hash).toBe('#skills');
  });

  test('renders ScrollIndicator component', () => {
    render(<Header />);

    // Check if ScrollIndicator is rendered
    const scrollIndicator = screen.getByTestId('scroll-indicator-mock');
    expect(scrollIndicator).toBeInTheDocument();
  });
});
