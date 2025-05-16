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
  useLocation: () => ({ hash: '#test' }),
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
});
