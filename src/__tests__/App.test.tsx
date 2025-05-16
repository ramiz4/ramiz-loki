import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';

import { App } from '../App';

// Mock all components to simplify testing
jest.mock('../components/Navbar', () => ({
  Navbar: () => <div data-testid="navbar-mock" />,
}));
jest.mock('../components/Header', () => ({
  Header: () => <div data-testid="header-mock" />,
}));
jest.mock('../components/About', () => ({
  About: () => <div data-testid="about-mock" />,
}));
jest.mock('../components/Skills', () => ({
  Skills: () => <div data-testid="skills-mock" />,
}));
jest.mock('../components/Experience', () => ({
  Experience: () => <div data-testid="experience-mock" />,
}));
jest.mock('../components/Education', () => ({
  Education: () => <div data-testid="education-mock" />,
}));
jest.mock('../components/Languages', () => ({
  Languages: () => <div data-testid="languages-mock" />,
}));
jest.mock('../components/Contact', () => ({
  Contact: () => <div data-testid="contact-mock" />,
}));
jest.mock('../components/Footer', () => ({
  Footer: () => <div data-testid="footer-mock" />,
}));
jest.mock('../components/ScrollToTop', () => ({
  ScrollToTop: () => <div data-testid="scroll-to-top-mock" />,
}));

// Mock the ScrollToSection component directly from App.tsx
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  HashRouter: ({ children }: { children: ReactNode }) => (
    <div data-testid="hash-router-mock">{children}</div>
  ),
  useLocation: jest.fn().mockReturnValue({ hash: '#test' }),
}));

describe('App', () => {
  beforeEach(() => {
    // Mock window.scrollTo
    window.scrollTo = jest.fn();

    // Mock document.getElementById
    jest
      .spyOn(document, 'getElementById')
      .mockImplementation(() => document.createElement('div'));

    // Mock document.querySelector for navbar
    jest.spyOn(document, 'querySelector').mockImplementation(() => {
      const nav = document.createElement('nav');
      Object.defineProperty(nav, 'offsetHeight', { value: 60 });
      return nav;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders all main components', () => {
    render(<App />);

    // Check if all main components are rendered
    expect(screen.getByTestId('navbar-mock')).toBeInTheDocument();
    expect(screen.getByTestId('header-mock')).toBeInTheDocument();
    expect(screen.getByTestId('about-mock')).toBeInTheDocument();
    expect(screen.getByTestId('skills-mock')).toBeInTheDocument();
    expect(screen.getByTestId('experience-mock')).toBeInTheDocument();
    expect(screen.getByTestId('education-mock')).toBeInTheDocument();
    expect(screen.getByTestId('languages-mock')).toBeInTheDocument();
    expect(screen.getByTestId('contact-mock')).toBeInTheDocument();
    expect(screen.getByTestId('footer-mock')).toBeInTheDocument();
    expect(screen.getByTestId('scroll-to-top-mock')).toBeInTheDocument();
    expect(screen.getByTestId('hash-router-mock')).toBeInTheDocument();
  });

  test('uses HashRouter for routing', () => {
    render(<App />);

    // Check that the HashRouter mock is rendered
    expect(screen.getByTestId('hash-router-mock')).toBeInTheDocument();

    // Since we're mocking the HashRouter and components, we can't directly test
    // the class on the MainContent div. Instead, we'll verify that the structure
    // with all the key components is present.
    expect(screen.getByTestId('navbar-mock')).toBeInTheDocument();
    expect(screen.getByTestId('header-mock')).toBeInTheDocument();
    expect(screen.getByTestId('scroll-to-top-mock')).toBeInTheDocument();
  });

  test('scrolls to section when location hash is present', () => {
    jest.useFakeTimers();

    // Mock useLocation to return a hash
    const useLocationMock = require('react-router-dom').useLocation;
    useLocationMock.mockReturnValue({ hash: '#test' });

    render(<App />);

    // Advance timers to trigger the useEffect in ScrollToSection
    jest.advanceTimersByTime(100);

    // Verify window.scrollTo was called
    expect(window.scrollTo).toHaveBeenCalled();
    expect(window.scrollTo).toHaveBeenCalledWith(
      expect.objectContaining({
        behavior: 'smooth',
      }),
    );

    jest.useRealTimers();
  });

  test('scrolls to top when no location hash is present', () => {
    jest.useFakeTimers();

    // Mock useLocation to return an empty hash
    const useLocationMock = require('react-router-dom').useLocation;
    useLocationMock.mockReturnValue({ hash: '' });

    render(<App />);

    // Advance timers to trigger the useEffect in ScrollToSection
    jest.advanceTimersByTime(100);

    // Verify window.scrollTo was called with top: 0
    expect(window.scrollTo).toHaveBeenCalled();
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });

    jest.useRealTimers();
  });

  test('scrolls to section when nav element is not found', () => {
    jest.useFakeTimers();

    // Mock useLocation to return a hash
    const useLocationMock = require('react-router-dom').useLocation;
    useLocationMock.mockReturnValue({ hash: '#test' });

    // Mock document.getElementById
    jest
      .spyOn(document, 'getElementById')
      .mockImplementation(() => document.createElement('div'));

    // Mock document.querySelector to return null for 'nav'
    jest.spyOn(document, 'querySelector').mockImplementation(() => null);

    render(<App />);

    // Advance timers to trigger the useEffect in ScrollToSection
    jest.advanceTimersByTime(100);

    // Verify window.scrollTo was called with the correct parameters
    // In this case, navHeight should be 0
    expect(window.scrollTo).toHaveBeenCalled();
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: expect.any(Number),
      behavior: 'smooth',
    });

    jest.useRealTimers();
  });

  test('handles case when element with hash id is not found', () => {
    jest.useFakeTimers();

    // Mock useLocation to return a hash
    const useLocationMock = require('react-router-dom').useLocation;
    useLocationMock.mockReturnValue({ hash: '#nonexistent' });

    // Mock document.getElementById to return null
    jest.spyOn(document, 'getElementById').mockImplementation(() => null);

    render(<App />);

    // Advance timers to trigger the useEffect in ScrollToSection
    jest.advanceTimersByTime(100);

    // window.scrollTo should not be called if element is not found
    expect(window.scrollTo).not.toHaveBeenCalled();

    jest.useRealTimers();
  });
});
