import { act, fireEvent, screen } from '@testing-library/react';

import { Skills } from '../components/Skills';

import { render } from './test-utils';

describe('Skills', () => {
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

  test('renders skills section with title', () => {
    render(<Skills />);
    expect(screen.getByText('Skills & Expertise')).toBeInTheDocument();
  });

  test('renders all category filter buttons', () => {
    render(<Skills />);

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('Backend')).toBeInTheDocument();
    expect(screen.getByText('Database')).toBeInTheDocument();
    expect(screen.getByText('Tools')).toBeInTheDocument();
  });

  test('filters skills when category is selected', () => {
    render(<Skills />);

    // Initially all skills should be visible
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('Java')).toBeInTheDocument();

    // Click on Frontend category
    fireEvent.click(screen.getByText('Frontend'));

    // Should show frontend skills and hide others
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.queryByText('Node.js')).not.toBeInTheDocument();
    expect(screen.queryByText('Java')).not.toBeInTheDocument();

    // Click on Backend category
    fireEvent.click(screen.getByText('Backend'));

    // Should show backend skills and hide others
    expect(screen.queryByText('JavaScript')).not.toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('Java')).toBeInTheDocument();

    // Click on All to show everything again
    fireEvent.click(screen.getByText('All'));
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('Java')).toBeInTheDocument();
  });

  test('displays skill levels correctly', () => {
    render(<Skills />);

    // Find skill elements by their names
    const jsSkillName = screen.getByText('JavaScript');
    const jsSkillCard =
      jsSkillName.closest('.group') || jsSkillName.closest('div');
    expect(jsSkillCard).toHaveTextContent('90%');

    const tsSkillName = screen.getByText('TypeScript');
    const tsSkillCard =
      tsSkillName.closest('.group') || tsSkillName.closest('div');
    expect(tsSkillCard).toHaveTextContent('85%');
  });

  test('handles intersection observer for animation', () => {
    const observeMock = jest.fn();
    const mockCallback = jest.fn();

    // Create mock IntersectionObserver that calls the callback immediately
    window.IntersectionObserver = jest.fn().mockImplementation(callback => {
      mockCallback.mockImplementation(() => {
        // Create a properly typed observer instance
        const mockObserverInstance: IntersectionObserver = {
          root: null,
          rootMargin: '',
          thresholds: [],
          observe: observeMock,
          unobserve: jest.fn(),
          disconnect: jest.fn(),
          takeRecords: () => [],
        };

        callback(
          [{ isIntersecting: true } as IntersectionObserverEntry],
          mockObserverInstance,
        );
      });

      return {
        observe: observeMock,
        unobserve: jest.fn(),
        disconnect: jest.fn(),
        root: null,
        rootMargin: '',
        thresholds: [],
        takeRecords: () => [],
      };
    });

    const { container } = render(<Skills />);

    // Verify that IntersectionObserver was initialized and observe was called
    expect(observeMock).toHaveBeenCalled();

    // Find the skills section using container.querySelector instead of screen.getByRole
    const skillsSection = container.querySelector('#skills');
    expect(skillsSection).toBeInTheDocument();
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
        root: null,
        rootMargin: '',
        thresholds: [],
        takeRecords: () => [],
      };
    });

    const { container } = render(<Skills />);

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
            target: container.querySelector('#skills') as Element,
          } as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      );
    }); // Check if animations are applied based on the isInView state being true
    // Skill cards should have opacity 1 and no longer have translateY
    const skillCards = container.querySelectorAll('.group.bg-white\\/5');
    expect(skillCards.length).toBeGreaterThan(0);
    skillCards.forEach(card => {
      expect(card).toHaveStyle({ opacity: '1' });
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
        root: null,
        rootMargin: '',
        thresholds: [],
        takeRecords: () => [],
      };
    });

    const { unmount } = render(<Skills />);

    // Unmount the component
    unmount();

    // Verify unobserve was called during cleanup
    expect(unobserveMock).toHaveBeenCalled();
  });

  test('filter buttons have correct ARIA attributes', () => {
    render(<Skills />);

    // Get filter buttons
    const allButton = screen.getByText('All').closest('button');
    const frontendButton = screen.getByText('Frontend').closest('button');

    // Check that buttons have aria-label
    expect(allButton).toHaveAttribute('aria-label', 'Filter skills by All');
    expect(frontendButton).toHaveAttribute(
      'aria-label',
      'Filter skills by Frontend',
    );

    // Check that active button has aria-current="true"
    expect(allButton).toHaveAttribute('aria-current', 'true');
    expect(frontendButton).not.toHaveAttribute('aria-current');

    // Click frontend button and check aria-current updates
    fireEvent.click(frontendButton!);
    expect(frontendButton).toHaveAttribute('aria-current', 'true');
    expect(allButton).not.toHaveAttribute('aria-current');
  });

  test('skills grid has proper list semantics', () => {
    const { container } = render(<Skills />);

    // Check that skills grid has role="list"
    const skillsGrid = container.querySelector('[role="list"]');
    expect(skillsGrid).toBeInTheDocument();
    expect(skillsGrid).toHaveAttribute('aria-label', 'All skills');

    // Check that skill items have role="listitem"
    const skillItems = container.querySelectorAll('[role="listitem"]');
    expect(skillItems.length).toBeGreaterThan(0);
  });

  test('progress bars have correct ARIA attributes', () => {
    const { container } = render(<Skills />);

    // Find a progress bar
    const progressBars = container.querySelectorAll('[role="progressbar"]');
    expect(progressBars.length).toBeGreaterThan(0);

    // Check first progress bar has all required ARIA attributes
    const firstProgressBar = progressBars[0];
    expect(firstProgressBar).toHaveAttribute('aria-label');
    expect(firstProgressBar).toHaveAttribute('aria-valuenow');
    expect(firstProgressBar).toHaveAttribute('aria-valuemin', '0');
    expect(firstProgressBar).toHaveAttribute('aria-valuemax', '100');
  });
});
