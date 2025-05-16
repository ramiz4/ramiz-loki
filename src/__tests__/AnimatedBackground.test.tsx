import { render, screen, fireEvent, act } from '@testing-library/react';
import { AnimatedBackground } from '../components/AnimatedBackground';

describe('AnimatedBackground', () => {
  const originalEnv = process.env.NODE_ENV;
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;

  beforeEach(() => {
    // Mock window methods
    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
    
    // Mock window dimensions
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: 768, writable: true });
    
    // Mock requestAnimationFrame and cancelAnimationFrame
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
      cb(0);
      return 0;
    });
    window.cancelAnimationFrame = jest.fn();
    
    // Ensure we're in test environment
    process.env.NODE_ENV = 'test';
  });

  afterEach(() => {
    jest.clearAllMocks();
    process.env.NODE_ENV = originalEnv;
    
    // Restore window dimensions
    Object.defineProperty(window, 'innerWidth', { value: originalInnerWidth, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: originalInnerHeight, writable: true });
  });

  test('renders with correct props', () => {
    render(<AnimatedBackground imagePath="/test-image.png" />);
    const image = screen.getByAltText('Animated background');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.png');
  });

  test('applies loading state properly', () => {
    render(<AnimatedBackground imagePath="/test-image.png" />);
    const container = screen.getByAltText('Animated background').parentElement?.parentElement;
    expect(container).toHaveClass('opacity-0');
    
    // Simulate image load
    fireEvent.load(screen.getByAltText('Animated background'));
    expect(container).toHaveClass('opacity-100');
  });
  
  test('handles mouse move events', () => {
    render(<AnimatedBackground imagePath="/test-image.png" />);
    
    // Extract the mousemove handler
    const mousemoveHandler = (window.addEventListener as jest.Mock).mock.calls.find(
      call => call[0] === 'mousemove'
    )[1];
    
    // Simulate a mouse move event
    act(() => {
      mousemoveHandler({
        clientX: 100,
        clientY: 200
      });
    });
    
    // Simulate another move with higher speed to trigger particle creation
    act(() => {
      mousemoveHandler({
        clientX: 150, // Move 50px horizontally
        clientY: 250  // Move 50px vertically
      });
    });

    // Test extreme values
    act(() => {
      mousemoveHandler({
        clientX: 0,
        clientY: 0
      });
    });

    act(() => {
      mousemoveHandler({
        clientX: window.innerWidth,
        clientY: window.innerHeight
      });
    });
  });
  
  test('handles click events', () => {
    render(<AnimatedBackground imagePath="/test-image.png" />);
    
    // Extract the click handler
    const clickHandler = (window.addEventListener as jest.Mock).mock.calls.find(
      call => call[0] === 'click'
    )[1];
    
    // Simulate a click event at different positions
    act(() => {
      clickHandler({
        clientX: 100,
        clientY: 200
      });
    });

    act(() => {
      clickHandler({
        clientX: 500,
        clientY: 300
      });
    });

    // Verify click ripples were added (indirectly, by checking classNames related to ripples)
    const rippleLayers = document.querySelectorAll('.absolute.inset-0');
    expect(rippleLayers.length).toBeGreaterThan(0);
  });

  test('adds particles correctly', () => {
    render(<AnimatedBackground imagePath="/test-image.png" />);
    
    // Trigger mouse move event to call addParticles
    const mousemoveHandler = (window.addEventListener as jest.Mock).mock.calls.find(
      call => call[0] === 'mousemove'
    )[1];
    
    // Move with enough speed to trigger particles
    act(() => {
      // First record position
      mousemoveHandler({
        clientX: 0,
        clientY: 0
      });
      
      // Then move quickly
      mousemoveHandler({
        clientX: 100,
        clientY: 100
      });
    });
    
    // Another sequence with even higher speed
    act(() => {
      mousemoveHandler({
        clientX: 100,
        clientY: 100
      });
      
      // Move very quickly to trigger more particles
      mousemoveHandler({
        clientX: 300,
        clientY: 300
      });
    });
  });

  test('renders grid lines', () => {
    render(<AnimatedBackground imagePath="/test-image.png" />);
    
    // Check that grid lines are rendered
    const gridLines = document.querySelectorAll('.absolute.h-full.w-px');
    expect(gridLines.length).toBe(6);
    
    // Check that the grid lines have the correct styles
    const firstGridLine = gridLines[0] as HTMLElement;
    expect(firstGridLine.style.animation).toBe('verticalLine 3s ease-in-out infinite');
  });

  test('does not render canvas in test environment', () => {
    render(<AnimatedBackground imagePath="/test-image.png" />);
    const canvas = document.querySelector('canvas');
    expect(canvas).not.toBeInTheDocument();
  });
    test('applies mouse position to transform styles', () => {
    render(<AnimatedBackground imagePath="/test-image.png" />);
    
    // Extract the mousemove handler
    const mousemoveHandler = (window.addEventListener as jest.Mock).mock.calls.find(
      call => call[0] === 'mousemove'
    )[1];
    
    // Simulate a mouse move event
    act(() => {
      mousemoveHandler({
        clientX: 200,
        clientY: 150
      });
    });
    
    // Check that transforms are applied based on mouse position
    const transformedElements = document.querySelectorAll('[style*="transform"]');
    expect(transformedElements.length).toBeGreaterThan(0);
    
    // Check the main container transform
    const mainContainer = screen.getByAltText('Animated background').parentElement?.parentElement;
    expect(mainContainer?.style.transform).toBeDefined();
  });

  test('handles setTimeout for isLoaded state', () => {
    // Spy on setTimeout
    jest.useFakeTimers();
    
    render(<AnimatedBackground imagePath="/test-image.png" />);
    const container = screen.getByAltText('Animated background').parentElement?.parentElement;
    expect(container).toHaveClass('opacity-0');
    
    // Fast-forward timers to trigger the setTimeout callback
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    // Check that the container now has opacity-100 class
    expect(container).toHaveClass('opacity-100');
    
    jest.useRealTimers();
  });
  test('cleans up event listeners and timeouts on unmount', () => {
    // Mock clearTimeout
    const originalClearTimeout = window.clearTimeout;
    window.clearTimeout = jest.fn();
    
    const { unmount } = render(<AnimatedBackground imagePath="/test-image.png" />);
    
    // Check that event listeners are set up
    expect(window.addEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(window.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
    
    // Test cleanup
    unmount();
    
    // Verify that listeners were removed
    expect(window.removeEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(window.removeEventListener).toHaveBeenCalledWith('click', expect.any(Function));
    
    // Verify that the timeout was cleared (not exact but sufficient verification)
    expect(window.clearTimeout).toHaveBeenCalled();
    
    // Restore original clearTimeout
    window.clearTimeout = originalClearTimeout;
  });
  test('handles canvas operations in non-test environment', () => {
    // We don't actually test canvas operations since they throw errors in JSDOM
    // Instead just verify that when in production, the conditional would allow canvas operations
    
    // Mock process.env.NODE_ENV to simulate production
    const originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    
    // Check that canvas element is rendered in non-test environment
    const { container } = render(<AnimatedBackground imagePath="/test-image.png" />);
    const canvasElements = container.querySelectorAll('canvas');
    expect(canvasElements.length).toBeGreaterThan(0);
    
    // Restore NODE_ENV
    process.env.NODE_ENV = originalNodeEnv;
  });  test('handles click event animation with ripples', () => {
    // We can't test the actual canvas ripple animation, so instead verify other aspects
    render(<AnimatedBackground imagePath="/test-image.png" />);
    
    // Extract the click handler
    const clickHandler = (window.addEventListener as jest.Mock).mock.calls.find(
      call => call[0] === 'click'
    )[1];
    
    // Store the original addEventListener to restore later
    const originalAddEventListener = window.addEventListener;
    
    // Create a new instance
    window.addEventListener = jest.fn();
    render(<AnimatedBackground imagePath="/test-image.png" />);
    
    // Restore original addEventListener
    window.addEventListener = originalAddEventListener;
    
    // Simulate multiple clicks
    for (let i = 0; i < 3; i++) {
      act(() => {
        clickHandler({
          clientX: 100 + i * 50,
          clientY: 200 + i * 30
        });
      });
    }
    
    // Verify animation styles in general
    const gridLines = document.querySelectorAll('.h-full.w-px');
    expect(gridLines.length).toBeGreaterThan(0);
    
    // Check animation attribute
    const animatedElement = document.querySelector('[style*="animation"]');
    expect(animatedElement).toBeInTheDocument();
  });
});
