import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Navbar } from '../components/Navbar';

describe('Navbar', () => {
  // Helper function to render the component
  const renderNavbar = () => {
    return render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );
  };

  // Store original window.scrollY
  const originalScrollY = window.scrollY;

  beforeEach(() => {
    // Reset window.scrollY before each test
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    });
  });

  afterAll(() => {
    // Restore original window.scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: originalScrollY,
    });
  });

  test('renders navigation links', () => {
    renderNavbar();

    // Check for navigation links
    expect(screen.getByText('ABOUT')).toBeInTheDocument();
    expect(screen.getByText('SKILLS')).toBeInTheDocument();
    expect(screen.getByText('EXPERIENCE')).toBeInTheDocument();
    expect(screen.getByText('EDUCATION')).toBeInTheDocument();
    expect(screen.getByText('CONTACT')).toBeInTheDocument();
  });

  test('displays mobile menu button', () => {
    renderNavbar();

    // Check for mobile menu button
    const menuButton = screen.getByRole('button');
    expect(menuButton).toBeInTheDocument();
  });

  test('navbar becomes opaque on scroll', () => {
    renderNavbar();

    // Initially navbar should be transparent
    const navbar = screen.getByRole('navigation');
    expect(navbar).not.toHaveClass('bg-[#001a11]/80');

    // Simulate scrolling
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 20,
    });
    fireEvent.scroll(window);

    // Navbar should now be opaque
    expect(navbar).toHaveClass('bg-[#001a11]/80');
    expect(navbar).toHaveClass('backdrop-blur-md');
  });

  test('navbar has correct brand/logo', () => {
    renderNavbar();

    // Check for logo/brand
    const brandLogo = screen.getByText('RL');
    expect(brandLogo).toBeInTheDocument();
    expect(brandLogo).toHaveClass('text-[#00ff9d]');
  });
});
