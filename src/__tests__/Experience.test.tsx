import { act, render, screen } from '@testing-library/react';
import { Experience } from '../components/Experience';

describe('Experience', () => {
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
    render(<Experience />);
    expect(screen.getByText('Professional Experience')).toBeInTheDocument();
    expect(
      screen.getByText(
        'My professional journey as a software engineer across different companies and roles',
      ),
    ).toBeInTheDocument();
  });

  test('renders all job experiences with correct titles and companies', () => {
    render(<Experience />);

    // Check job titles using getAllByText for elements that appear multiple times
    expect(
      screen.getAllByText('Senior Full-Stack Software Engineer')[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByText('Full-Stack Software Engineer')[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByText('Founder / Full-Stack Software Engineer')[0],
    ).toBeInTheDocument();

    // Check companies - use getAllByText for elements that appear in both desktop and mobile views
    expect(
      screen.getAllByText('Base-Net Informatik AG, Sursee')[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(
        'Schuco Digital GmbH (Schuco International KG), Bielefeld',
      )[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByText('Secunet Security Networks AG, Essen')[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByText('LoHox IT Service, Paderborn')[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByText('Startup Freunde UG, Heidelberg')[0],
    ).toBeInTheDocument();
  });

  test('renders job time periods correctly', () => {
    render(<Experience />);

    // Use getAllByText for elements that appear in both desktop and mobile views
    expect(screen.getAllByText('08/2022 - Present')[0]).toBeInTheDocument();
    expect(screen.getAllByText('01/2014 - 07/2022')[0]).toBeInTheDocument();
    expect(screen.getAllByText('06/2010 - 09/2010')[0]).toBeInTheDocument();
    expect(screen.getAllByText('12/2007 - 12/2013')[0]).toBeInTheDocument();
    expect(screen.getAllByText('11/2012 - 09/2013')[0]).toBeInTheDocument();
  });

  test('renders job skill tags correctly', () => {
    render(<Experience />);

    // Use getAllByText for skill tags that appear in both desktop and mobile views
    expect(screen.getAllByText('Angular')[0]).toBeInTheDocument();
    expect(screen.getAllByText('TypeScript')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Node.js')[0]).toBeInTheDocument();
    expect(screen.getAllByText('MongoDB')[0]).toBeInTheDocument();
    expect(screen.getAllByText('MEAN Stack')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Python')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Security')[0]).toBeInTheDocument();
    expect(screen.getAllByText('JavaScript')[0]).toBeInTheDocument();
  });

  test('renders job details for completed positions', () => {
    render(<Experience />);

    // Use getAllByText for job details that appear in both desktop and mobile views
    expect(
      screen.getAllByText(
        'Follow best practices and participate in code reviews to ensure high-quality code',
      )[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(
        'Experience with Angular, MEAN stack and other frameworks',
      )[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(
        'Developing a plugin in PHP for the internal MediaWiki page',
      )[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByText('Experience in full-stack web development')[0],
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

    const { container } = render(<Experience />);

    // Verify IntersectionObserver was initialized and observe was called
    expect(observeMock).toHaveBeenCalled();

    // Find the experience section
    const experienceSection = container.querySelector('#experience');
    expect(experienceSection).toBeInTheDocument();
  });

  test('triggers animation when element intersects', () => {
    // Mock implementation with callback capture
    let intersectionCallback: IntersectionObserverCallback;
    const observeMock = jest.fn();
    const unobserveMock = jest.fn();

    window.IntersectionObserver = jest.fn().mockImplementation((callback) => {
      intersectionCallback = callback;
      return {
        observe: observeMock,
        unobserve: unobserveMock,
        disconnect: jest.fn(),
      };
    });

    const { container } = render(<Experience />);

    // Verify observer was initialized with correct threshold
    expect(window.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { threshold: 0.2 }
    );

    // Simulate intersection event (element comes into view)
    act(() => {
      intersectionCallback([
        {
          isIntersecting: true,
          target: container.querySelector('#experience') as Element,
        } as IntersectionObserverEntry,
      ], {} as IntersectionObserver);
    });

    // Check if animations are applied based on the isInView state being true
    // Animation elements like the timeline center line should no longer have opacity-0
    const timelineCenterLine = container.querySelector('.lg\\:block.relative > div');
    expect(timelineCenterLine).toHaveClass('opacity-100');
    expect(timelineCenterLine).not.toHaveClass('opacity-0');
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

    const { unmount } = render(<Experience />);

    // Unmount the component
    unmount();

    // Verify unobserve was called during cleanup
    expect(unobserveMock).toHaveBeenCalled();
  });

  test('renders message for current job with no details', () => {
    render(<Experience />);

    expect(
      screen.getAllByText('Currently working in this position. More details to come...')[0]
    ).toBeInTheDocument();
  });
});
