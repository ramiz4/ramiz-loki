import { fireEvent, screen } from '@testing-library/react';

import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';

import { render } from './test-utils';

// Mock useLanguage to control language state
jest.mock('../context/LanguageContext', () => ({
  ...jest.requireActual('../context/LanguageContext'),
  useLanguage: jest.fn(),
}));

describe('LanguageSwitcher', () => {
  const mockSetLanguage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders language switcher with DE when language is English', () => {
    (useLanguage as jest.Mock).mockReturnValue({
      language: 'en',
      setLanguage: mockSetLanguage,
    });

    render(<LanguageSwitcher />);

    expect(screen.getByText('DE')).toBeInTheDocument();
    expect(screen.getByLabelText('Zu Deutsch wechseln')).toBeInTheDocument();
  });

  test('renders language switcher with EN when language is German', () => {
    (useLanguage as jest.Mock).mockReturnValue({
      language: 'de',
      setLanguage: mockSetLanguage,
    });

    render(<LanguageSwitcher />);

    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByLabelText('Switch to English')).toBeInTheDocument();
  });

  test('calls setLanguage with functional update when clicked', () => {
    (useLanguage as jest.Mock).mockReturnValue({
      language: 'en',
      setLanguage: mockSetLanguage,
    });

    render(<LanguageSwitcher />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockSetLanguage).toHaveBeenCalledTimes(1);
    // Verify it was called with a function
    expect(typeof mockSetLanguage.mock.calls[0][0]).toBe('function');

    // Test the function returns correct value
    const updateFunction = mockSetLanguage.mock.calls[0][0];
    expect(updateFunction('en')).toBe('de');
    expect(updateFunction('de')).toBe('en');
  });

  test('has correct styling classes', () => {
    (useLanguage as jest.Mock).mockReturnValue({
      language: 'en',
      setLanguage: mockSetLanguage,
    });

    render(<LanguageSwitcher />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('flex');
    expect(button).toHaveClass('items-center');
    expect(button).toHaveClass('gap-2');
    expect(button).toHaveClass('px-3');
    expect(button).toHaveClass('py-2');
    expect(button).toHaveClass('rounded-lg');
  });

  test('renders globe icon', () => {
    (useLanguage as jest.Mock).mockReturnValue({
      language: 'en',
      setLanguage: mockSetLanguage,
    });

    const { container } = render(<LanguageSwitcher />);

    // Check for SVG element (globe icon from lucide-react)
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
