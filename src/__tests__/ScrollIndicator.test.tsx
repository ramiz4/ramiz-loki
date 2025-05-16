import { fireEvent, render, screen } from '@testing-library/react';

import { ScrollIndicator } from '../components/ScrollIndicator';

describe('ScrollIndicator', () => {
  beforeEach(() => {
    // Mock window.scrollY and other scroll-related properties
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 2000,
      writable: true,
    });
    Object.defineProperty(window, 'innerHeight', {
      value: 1000,
      writable: true,
    });
  });

  test('renders scroll indicator component', () => {
    const { container } = render(<ScrollIndicator />);

    // Check if the main container is rendered using a more specific approach
    const mainContainer = container.querySelector('div[class*="fixed"]');
    expect(mainContainer).toBeInTheDocument();

    // Check for the scroll text
    expect(screen.getByText('SCROLL TO EXPLORE')).toBeInTheDocument();
  });

  test('updates scroll progress based on scroll position', () => {
    const { container } = render(<ScrollIndicator />);

    // Find the progress bar element
    const progressBar = container.querySelector(
      '.absolute.bottom-0.left-0.w-full.bg-gradient-to-t',
    );
    expect(progressBar).toBeInTheDocument();

    // Initial state (0% scrolled)
    expect(progressBar).toHaveStyle('height: 0%');

    // Simulate scrolling 25% down the page
    window.scrollY = 250; // 25% of (scrollHeight - innerHeight)
    fireEvent.scroll(window);
    expect(progressBar).toHaveStyle('height: 25%');

    // Simulate scrolling 50% down the page
    window.scrollY = 500; // 50% of (scrollHeight - innerHeight)
    fireEvent.scroll(window);
    expect(progressBar).toHaveStyle('height: 50%');

    // Simulate scrolling 100% down the page
    window.scrollY = 1000; // 100% of (scrollHeight - innerHeight)
    fireEvent.scroll(window);
    expect(progressBar).toHaveStyle('height: 100%');
  });

  test('shows hover effect when mouse enters', () => {
    const { container } = render(<ScrollIndicator />);

    // Find the progress container element
    const progressContainer = container.querySelector('.h-36.w-1.bg-gray-800');
    expect(progressContainer).toBeInTheDocument();

    // Find the glow effect element that changes on hover
    const glowEffect = container.querySelector('.absolute.blur-none.opacity-0');
    expect(glowEffect).toBeInTheDocument();

    // Simulate hover
    fireEvent.mouseEnter(progressContainer!);

    // After hover, check if the class has changed
    const glowEffectAfter = container.querySelector(
      '.absolute.blur-md.opacity-50',
    );
    expect(glowEffectAfter).toBeInTheDocument();

    // Simulate mouse leave
    fireEvent.mouseLeave(progressContainer!);

    // After leaving, check if the class has changed back
    const glowEffectAfterLeave = container.querySelector(
      '.absolute.blur-none.opacity-0',
    );
    expect(glowEffectAfterLeave).toBeInTheDocument();
  });

  test('cleans up event listeners on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = render(<ScrollIndicator />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
    );
  });
});
