import { render, screen, fireEvent, act } from '@testing-library/react';

import { Contact } from '../components/Contact';

// Using a different approach without mocking timers
describe('Contact', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

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
  test('simulates form submission and loading state', () => {
    render(<Contact />);
    
    // Fill out the form with values using fireEvent instead of userEvent to avoid timeouts
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'Test Subject' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message content' } });

    // Submit form
    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    // Check for loading spinner
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });
  test('handles input changes correctly', () => {
    render(<Contact />);
    
    const nameInput = screen.getByLabelText(/your name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);
    
    // Use fireEvent instead of userEvent to avoid timeouts
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput).toHaveValue('John Doe');
    
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    expect(emailInput).toHaveValue('john@example.com');
    
    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
    expect(subjectInput).toHaveValue('Test Subject');
    
    fireEvent.change(messageInput, { target: { value: 'This is a test message' } });
    expect(messageInput).toHaveValue('This is a test message');
  });
  // Test with mocked timers to verify form success state
  test('shows success message after submission and clears it after delay', () => {
    render(<Contact />);
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'Test Subject' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message content' } });
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);
    
    // Verify loading state is shown
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    
    // Fast-forward first timeout (1500ms) to simulate form submission complete
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    
    // Verify success message is shown and form is reset
    expect(screen.getByText(/Message sent successfully! I'll get back to you soon./i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your name/i)).toHaveValue('');
    expect(screen.getByLabelText(/email address/i)).toHaveValue('');
    expect(screen.getByLabelText(/subject/i)).toHaveValue('');
    expect(screen.getByLabelText(/message/i)).toHaveValue('');
    
    // Fast-forward second timeout (3000ms) to verify success message disappears
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    
    // Success message should be gone now
    expect(screen.queryByText(/Message sent successfully! I'll get back to you soon./i)).not.toBeInTheDocument();
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
