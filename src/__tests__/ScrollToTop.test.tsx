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
  });
});
