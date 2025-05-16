import { render, screen } from '@testing-library/react';

import { Footer } from '../components/Footer';

describe('Footer', () => {
  test('renders footer with correct name and title', () => {
    render(<Footer />);
    expect(screen.getByText('Ramiz')).toBeInTheDocument();
    expect(screen.getByText('Loki')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Senior Full-Stack Software Engineer with extensive experience in web development and team leadership.',
      ),
    ).toBeInTheDocument();
  });

  test('renders contact information correctly', () => {
    render(<Footer />);

    // Check contact heading
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Info')).toBeInTheDocument();

    // Check contact details
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('me@ramizloki.com')).toBeInTheDocument();

    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('+41 76 441 8288')).toBeInTheDocument();

    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Wettingen, Switzerland')).toBeInTheDocument();
  });

  test('renders social media links', () => {
    render(<Footer />);

    // Check for the presence of social media links
    const socialLinks = screen.getAllByRole('link');
    expect(socialLinks.length).toBeGreaterThanOrEqual(3); // At least LinkedIn, GitHub and StackOverflow

    // Check for mail link
    const mailLink = screen.getByText('me@ramizloki.com');
    expect(mailLink.closest('a')).toHaveAttribute(
      'href',
      'mailto:me@ramizloki.com',
    );
  });

  test('displays copyright notice with current year', () => {
    render(<Footer />);

    // Get current year
    const currentYear = new Date().getFullYear().toString();

    // Check copyright text contains current year
    const copyrightText = screen.getByText(content =>
      content.includes(`© ${currentYear} Ramiz Loki. All rights reserved.`),
    );
    expect(copyrightText).toBeInTheDocument();
  });
});
