import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Contact } from '../components/Contact';

// Using a different approach without mocking timers
describe('Contact', () => {
  test('renders contact form with all fields', () => {
    render(<Contact />);

    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /send message/i }),
    ).toBeInTheDocument();
  });

  test('validates required fields before submission', () => {
    render(<Contact />);

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    // HTML5 validation should prevent submission and show required field messages
    expect(screen.getByLabelText(/your name/i)).toBeInvalid();
    expect(screen.getByLabelText(/email address/i)).toBeInvalid();
    expect(screen.getByLabelText(/subject/i)).toBeInvalid();
    expect(screen.getByLabelText(/message/i)).toBeInvalid();
  });

  test('shows loading state when form is submitted', async () => {
    const user = userEvent.setup({ delay: null }); // Use delay: null to avoid timing issues
    render(<Contact />);

    // Fill out the form with minimum values to pass validation
    await user.type(screen.getByLabelText(/your name/i), 'John Doe');
    await user.type(
      screen.getByLabelText(/email address/i),
      'john@example.com',
    );
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'Test message content');

    // Submit form
    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    // Check for loading spinner
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  test('form fields have proper attributes', () => {
    render(<Contact />);

    // Check input fields have proper attributes
    const nameInput = screen.getByLabelText(/your name/i);
    expect(nameInput).toHaveAttribute('required');
    expect(nameInput).toHaveAttribute('placeholder', 'John Doe');

    const emailInput = screen.getByLabelText(/email address/i);
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('required');

    const subjectInput = screen.getByLabelText(/subject/i);
    expect(subjectInput).toHaveAttribute('required');

    const messageTextarea = screen.getByLabelText(/message/i);
    expect(messageTextarea).toHaveAttribute('required');
  });
});
