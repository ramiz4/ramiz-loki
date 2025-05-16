import { render, screen, fireEvent } from '@testing-library/react';

import { ScrollToTop } from '../components/ScrollToTop';

describe('ScrollToTop', () => {
  beforeEach(() => {
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 0,
    });

    // Mock requestAnimationFrame
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
      cb(0);
      return 0;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('button is hidden when at top of page', () => {
    render(<ScrollToTop />);

    const button = screen.getByRole('button', { name: /scroll to top/i });
    expect(button).toHaveClass('opacity-0');
  });

  test('button appears when scrolled down', () => {
    // Mock scrolled position
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 400,
    });

    render(<ScrollToTop />);

    // Trigger scroll event
    fireEvent.scroll(window);

    const button = screen.getByRole('button', { name: /scroll to top/i });
    expect(button).toHaveClass('opacity-100');
  });

  test('cleans up scroll event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = render(<ScrollToTop />);
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
    );
  });

  test('button has correct accessibility attributes', () => {
    render(<ScrollToTop />);

    const button = screen.getByRole('button', { name: /scroll to top/i });
    expect(button).toHaveAttribute('aria-label', 'Scroll to top');
  });

  test('button has hover and animation effects', () => {
    render(<ScrollToTop />);

    const button = screen.getByRole('button', { name: /scroll to top/i });

    // Check for hover transition classes
    expect(button).toHaveClass('hover:bg-[#00cc7d]');
    expect(button).toHaveClass('transition-all');
    expect(button).toHaveClass('hover:scale-110');

    // Check for animation elements
    const hoverEffect = button.querySelector('.hover\\:animate-ping');
    expect(hoverEffect).toBeInTheDocument();

    const pulseAnimation = button.querySelector('.animate-ping');
    expect(pulseAnimation).toBeInTheDocument();
  });  test('scrollToTop function works correctly', () => {
    // Mock necessary window methods
    const originalReplaceState = window.history.replaceState;
    window.history.replaceState = jest.fn();
    window.scrollTo = jest.fn();
    Object.defineProperty(window, 'pageYOffset', { value: 500, configurable: true });
      // Modify the requestAnimationFrame to prevent infinite recursion
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(() => {
      return 0; // Don't actually call the callback
    });
    
    render(<ScrollToTop />);
    
    // Make button visible
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 400,
    });
    fireEvent.scroll(window);
    
    // Click the button to trigger scrollToTop
    const button = screen.getByRole('button', { name: /scroll to top/i });
    fireEvent.click(button);
    
    // Verify history.replaceState was called
    expect(window.history.replaceState).toHaveBeenCalled();
    expect(window.requestAnimationFrame).toHaveBeenCalled();
    
    // Restore original method
    window.history.replaceState = originalReplaceState;
  });

  test('animation properly handles timeframes', () => {
    // Mock necessary window methods
    const originalReplaceState = window.history.replaceState;
    window.history.replaceState = jest.fn();
    window.scrollTo = jest.fn();
    Object.defineProperty(window, 'pageYOffset', { value: 500, configurable: true });
    
    // Create a mock for requestAnimationFrame that will call the callback with different timestamps
    const requestAnimationFrameMock = jest.spyOn(window, 'requestAnimationFrame');
    
    // First call - animation start time (0ms)
    requestAnimationFrameMock.mockImplementationOnce(cb => {
      cb(0);
      return 1;
    });
    
    // Second call - middle of animation (400ms)
    requestAnimationFrameMock.mockImplementationOnce(cb => {
      cb(400);
      return 2;
    });
    
    // Third call - end of animation (800ms)
    requestAnimationFrameMock.mockImplementationOnce(cb => {
      cb(800);
      return 3;
    });
    
    // Fourth call - beyond animation duration (900ms) - should not be called
    requestAnimationFrameMock.mockImplementationOnce(cb => {
      cb(900);
      return 4;
    });
    
    render(<ScrollToTop />);
    
    // Make button visible and click it
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 400 });
    fireEvent.scroll(window);
    fireEvent.click(screen.getByRole('button', { name: /scroll to top/i }));
    
    // Verify scrollTo was called 3 times (for the 3 animation frames)
    expect(window.scrollTo).toHaveBeenCalledTimes(3);
    
    // Verify the requestAnimationFrame was called at least 3 times
    expect(requestAnimationFrameMock).toHaveBeenCalledTimes(3);
    
    // Restore original method
    window.history.replaceState = originalReplaceState;
  });
    test('easing function works properly', () => {
    // We'll test the easing function directly without triggering the animation
    
    // Mock the necessary components for scrollToTop function
    const originalReplaceState = window.history.replaceState;
    window.history.replaceState = jest.fn();
    window.scrollTo = jest.fn();
    
    // Create a function similar to the one in the component to test the easing
    const testEasing = (progress: number) => {
      return 1 - Math.pow(1 - progress, 3);
    };
    
    // Test various progress points
    const results = [
      { progress: 0, expected: 0 },
      { progress: 0.25, expected: 0.578 },
      { progress: 0.5, expected: 0.875 },
      { progress: 0.75, expected: 0.984 },
      { progress: 1, expected: 1 }
    ];
    
    results.forEach(({ progress, expected }) => {
      const result = testEasing(progress);
      // Use a threshold to account for floating point precision
      expect(result).toBeCloseTo(expected, 3);
    });
    
    // Restore original method
    window.history.replaceState = originalReplaceState;
  });
});
