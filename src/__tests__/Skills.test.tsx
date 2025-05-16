import { fireEvent, render, screen } from '@testing-library/react';

import { Skills } from '../components/Skills';

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
    expect(screen.getByText('MongoDB')).toBeInTheDocument();

    // Click on Frontend category
    fireEvent.click(screen.getByText('Frontend'));

    // Should show frontend skills and hide others
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.queryByText('Node.js')).not.toBeInTheDocument();
    expect(screen.queryByText('MongoDB')).not.toBeInTheDocument();

    // Click on Backend category
    fireEvent.click(screen.getByText('Backend'));

    // Should show backend skills and hide others
    expect(screen.queryByText('JavaScript')).not.toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();

    // Click on All to show everything again
    fireEvent.click(screen.getByText('All'));
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('MongoDB')).toBeInTheDocument();
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
});
