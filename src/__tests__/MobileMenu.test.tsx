import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MobileMenu } from '../components/MobileMenu';
import * as navigationUtils from '../utils/navigationUtils';

// Mock the navigationUtils module
jest.mock('../utils/navigationUtils', () => ({
  scrollToSection: jest.fn(),
}));

describe('MobileMenu Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders navigation links', () => {
    render(
      <MemoryRouter>
        <MobileMenu />
      </MemoryRouter>
    );

    // Check that all navigation links are rendered
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  test('applies active styling to current hash link', () => {
    // Set up the hash in memory router
    render(
      <MemoryRouter initialEntries={['/#skills']}>
        <MobileMenu />
      </MemoryRouter>
    );

    // Get all links
    const links = screen.getAllByRole('link');
    
    // Find the Skills link and check its styling
    const skillsLink = links.find(link => link.textContent === 'Skills');
    expect(skillsLink).toHaveClass('text-[#00ff9d]');
    
    // Other links should not have the active styling
    const aboutLink = links.find(link => link.textContent === 'About');
    expect(aboutLink).not.toHaveClass('text-[#00ff9d]');
    expect(aboutLink).toHaveClass('text-gray-300');
  });

  test('calls scrollToSection when a link is clicked', () => {
    render(
      <MemoryRouter>
        <MobileMenu />
      </MemoryRouter>
    );

    // Find and click on a link
    const contactLink = screen.getByText('Contact');
    fireEvent.click(contactLink);

    // Verify that scrollToSection was called with correct arguments
    expect(navigationUtils.scrollToSection).toHaveBeenCalledTimes(1);
    
    // The first argument is the event, second is the section ID
    expect(navigationUtils.scrollToSection).toHaveBeenCalledWith(
      expect.any(Object), // MouseEvent
      'contact',
      false, // isMenuOpen
      expect.any(Function) // setIsMenuOpen
    );
  });
});
