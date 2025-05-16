import { render, screen, act } from '@testing-library/react';

import { Languages } from '../components/Languages';

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();

  constructor(callback: IntersectionObserverCallback) {
    // Store callback to trigger it in tests when needed
    this.callback = callback;
  }

  // Add method to simulate intersection
  triggerIntersection(isIntersecting: boolean) {
    this.callback(
      [{ isIntersecting } as unknown as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }

  callback: IntersectionObserverCallback;
}

describe('Languages', () => {
  // Store the original IntersectionObserver
  const originalIntersectionObserver = window.IntersectionObserver;
  let mockObserver: MockIntersectionObserver;

  beforeEach(() => {
    // Mock IntersectionObserver before each test
    window.IntersectionObserver = jest.fn().mockImplementation(callback => {
      mockObserver = new MockIntersectionObserver(callback);
      return mockObserver;
    });
  });

  afterEach(() => {
    // Restore original IntersectionObserver after each test
    window.IntersectionObserver = originalIntersectionObserver;
  });

  test('renders languages section with title and description', () => {
    render(<Languages />);
    expect(screen.getByText('Languages')).toBeInTheDocument();
    expect(
      screen.getByText(/linguistic proficiency across different languages/i),
    ).toBeInTheDocument();
  });

  test('renders all language cards with correct data', () => {
    render(<Languages />);

    // Check German language
    const germanHeading = screen.getByText('German');
    expect(germanHeading).toBeInTheDocument();
    expect(screen.getByText('First Language')).toBeInTheDocument();

    // Use getAllBy to handle multiple elements with the same text
    const percentages = screen.getAllByText(/\d+%/);
    expect(percentages.length).toBeGreaterThanOrEqual(2); // At least German and English percentages

    // Check English language
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Fluent Knowledge')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();

    // Check Albanian language
    expect(screen.getByText('Albanian')).toBeInTheDocument();
    expect(screen.getByText('Native Language')).toBeInTheDocument();
  });

  test('adds in-view class when element is intersecting', () => {
    const { container } = render(<Languages />);

    // Initially cards should not have in-view class

    // Simulate intersection using act to properly handle React state updates
    act(() => {
      mockObserver.triggerIntersection(true);
    });

    // Now language progress bars should have in-view class
    const progressBars = container.querySelectorAll('.language-progress-bar');
    progressBars.forEach(bar => {
      expect(bar).toHaveClass('in-view');
    });
  });

  test('renders language flags as icons', () => {
    render(<Languages />);

    // Check if flag emojis are present
    const germanFlag = screen.getByText('🇩🇪');
    const ukFlag = screen.getByText('🇬🇧');
    const albanianFlag = screen.getByText('🇦🇱');

    expect(germanFlag).toBeInTheDocument();
    expect(ukFlag).toBeInTheDocument();
    expect(albanianFlag).toBeInTheDocument();
  });

  test('has correct progress bar widths', () => {
    const { container } = render(<Languages />);

    // Simulate intersection to show the bars
    act(() => {
      mockObserver.triggerIntersection(true);
    });

    // Check German progress bar (100%)
    const progressBars = container.querySelectorAll('.language-progress-bar');

    // German (first language)
    const germanBar = progressBars[0] as HTMLElement;
    expect(germanBar.style.getPropertyValue('--progress-width')).toBe('100%');

    // English (second language)
    const englishBar = progressBars[1] as HTMLElement;
    expect(englishBar.style.getPropertyValue('--progress-width')).toBe('75%');

    // Albanian (third language)
    const albanianBar = progressBars[2] as HTMLElement;
    expect(albanianBar.style.getPropertyValue('--progress-width')).toBe('100%');
  });

  test('cleans up intersection observer on unmount', () => {
    const { unmount } = render(<Languages />);

    // Should have created an observer
    expect(mockObserver.observe).toHaveBeenCalled();

    // Unmount component
    unmount();

    // Should have cleaned up by unobserving
    expect(mockObserver.unobserve).toHaveBeenCalled();
  });
});
