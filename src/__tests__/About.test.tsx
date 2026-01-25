import { act, screen } from '@testing-library/react';

import { About } from '../components/About';

import { render } from './test-utils';

describe('About', () => {
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
    render(<About />);
    expect(screen.getByText('About Me')).toBeInTheDocument();
    expect(
      screen.getByText('My experience, expertise and passion'),
    ).toBeInTheDocument();
  });

  test('renders all about cards with correct titles', () => {
    render(<About />);

    expect(screen.getByText('Full-Stack Developer')).toBeInTheDocument();
    expect(screen.getByText('Team Leader')).toBeInTheDocument();
    expect(screen.getByText('Problem Solver')).toBeInTheDocument();
  });

  test('renders card descriptions correctly', () => {
    render(<About />);

    expect(
      screen.getByText(
        'Experienced in building responsive web applications using modern frameworks and technologies.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Led the shift to agile, introducing iterative delivery methods as a team thought leader.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Passionate about following best practices and participating in code reviews to ensure high-quality code.',
      ),
    ).toBeInTheDocument();
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

    const { container } = render(<About />);

    // Verify IntersectionObserver was initialized and observe was called
    expect(observeMock).toHaveBeenCalled();

    // Find the about section
    const aboutSection = container.querySelector('#about');
    expect(aboutSection).toBeInTheDocument();
  });

  test('triggers animation when element intersects', () => {
    // Mock implementation with callback capture
    let intersectionCallback: IntersectionObserverCallback;
    const observeMock = jest.fn();
    const unobserveMock = jest.fn();
    window.IntersectionObserver = jest.fn().mockImplementation(callback => {
      intersectionCallback = callback;
      return {
        observe: observeMock,
        unobserve: unobserveMock,
        disconnect: jest.fn(),
      };
    });

    const { container } = render(<About />);

    // Verify observer was initialized with correct threshold
    expect(window.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { threshold: 0.2 },
    );

    // Simulate intersection event (element comes into view)
    act(() => {
      intersectionCallback(
        [
          {
            isIntersecting: true,
            target: container.querySelector('#about') as Element,
          } as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      );
    });

    // Check if animations are applied (cards should have the 'in-view' class)
    const animatedCards = container.querySelectorAll('.about-card');
    animatedCards.forEach(card => {
      expect(card).toHaveClass('in-view');
    });
  });

  test('cleans up intersection observer on unmount', () => {
    const observeMock = jest.fn();
    const unobserveMock = jest.fn();

    window.IntersectionObserver = jest.fn().mockImplementation(() => {
      return {
        observe: observeMock,
        unobserve: unobserveMock,
        disconnect: jest.fn(),
      };
    });

    const { unmount } = render(<About />);

    // Unmount the component
    unmount();

    // Verify unobserve was called during cleanup
    expect(unobserveMock).toHaveBeenCalled();
  });

  test('renders AI reference section', () => {
    render(<About />);

    expect(screen.getByText('AI Reference')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Professional assessment based on public profile analysis',
      ),
    ).toBeInTheDocument();
  });

  test('AI reference is initially collapsed', () => {
    render(<About />);

    // Check for text button
    const textButton = screen.getByText('Read More →');
    expect(textButton).toBeInTheDocument();

    // Check chevron button is not expanded
    const chevronButton = screen.getByRole('button', {
      name: /read more/i,
      expanded: false,
    });
    expect(chevronButton).toBeInTheDocument();

    // Content should be aria-hidden
    const content = screen.getByLabelText('AI Reference');
    expect(content).toHaveAttribute('aria-hidden', 'true');
  });

  test('AI reference expands when clicking chevron button', () => {
    render(<About />);

    const expandButton = screen.getByRole('button', {
      name: /read more/i,
      expanded: false,
    });

    act(() => {
      expandButton.click();
    });

    // Button should now be expanded
    expect(expandButton).toHaveAttribute('aria-expanded', 'true');

    // Content should no longer be aria-hidden
    const content = screen.getByLabelText('AI Reference');
    expect(content).toHaveAttribute('aria-hidden', 'false');

    // Paragraph content should be visible
    expect(
      screen.getByText(
        /Ramiz Loki is an experienced Full-Stack Software Engineer/,
      ),
    ).toBeInTheDocument();
  });

  test('AI reference collapses when clicking chevron button again', () => {
    render(<About />);

    const expandButton = screen.getByRole('button', {
      name: /read more/i,
      expanded: false,
    });

    // Expand first
    act(() => {
      expandButton.click();
    });

    // Verify it's expanded
    expect(expandButton).toHaveAttribute('aria-expanded', 'true');

    // Now collapse
    const collapseButton = screen.getByRole('button', {
      name: /read less/i,
      expanded: true,
    });

    act(() => {
      collapseButton.click();
    });

    // Should be collapsed again - check aria-expanded
    expect(collapseButton).toHaveAttribute('aria-expanded', 'false');

    // Content should be aria-hidden again
    const content = screen.getByLabelText('AI Reference');
    expect(content).toHaveAttribute('aria-hidden', 'true');
  });

  test('AI reference shows all paragraphs when expanded', () => {
    render(<About />);

    // Find and click the text button (it's more specific)
    const textButton = screen.getByText('Read More →');

    act(() => {
      textButton.click();
    });

    // Check for content from all paragraphs
    expect(
      screen.getByText(
        /Ramiz Loki is an experienced Full-Stack Software Engineer/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Particularly noteworthy is his strength/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/In addition to his technical expertise/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/From the perspective of a neutral/),
    ).toBeInTheDocument();
  });
});
