import { render } from '@testing-library/react';
import { useEffect } from 'react';
import { MemoryRouter, useLocation } from 'react-router-dom';

// Create the component from App.tsx for testing with actual useEffect
function ScrollToSection() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.substring(1);
      const element = document.getElementById(id);

      if (element) {
        setTimeout(() => {
          const navbar = document.querySelector('nav');
          const navHeight = navbar ? navbar.offsetHeight : 0;

          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - navHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }, 100);
      }
    }
  }, [hash]);

  return <div data-testid="scroll-section" data-hash={hash} />;
}

describe('ScrollToSection', () => {
  beforeEach(() => {
    // Mock scrollTo
    window.scrollTo = jest.fn();

    // Mock element.getBoundingClientRect
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        top: 100,
        left: 0,
        right: 0,
        bottom: 0,
        width: 0,
        height: 0,
        x: 0,
        y: 100,
        toJSON: () => ({}),
      } as DOMRect;
    });

    // Mock getElementById
    const originalGetElementById = document.getElementById;
    jest.spyOn(document, 'getElementById').mockImplementation(id => {
      if (id === 'about' || id === 'skills') {
        return document.createElement('div');
      }
      return originalGetElementById.call(document, id);
    });

    // Mock offsetHeight for navbar
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 64,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('component renders with the correct hash', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/#about']}>
        <ScrollToSection />
      </MemoryRouter>,
    );

    const component = getByTestId('scroll-section');
    expect(component).toHaveAttribute('data-hash', '#about');
  });

  test('component handles empty hash correctly', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/']}>
        <ScrollToSection />
      </MemoryRouter>,
    );

    const component = getByTestId('scroll-section');
    expect(component).toHaveAttribute('data-hash', '');
  });

  test('scrolls to element when hash changes', () => {
    jest.useFakeTimers();

    render(
      <MemoryRouter initialEntries={['/#skills']}>
        <ScrollToSection />
      </MemoryRouter>,
    );

    // Fast-forward timers
    jest.advanceTimersByTime(100);

    // Verify scrollTo was called after the timeout
    expect(window.scrollTo).toHaveBeenCalled();
    expect(window.scrollTo).toHaveBeenCalledWith(
      expect.objectContaining({ behavior: 'smooth' }),
    );

    jest.useRealTimers();
  });
});
