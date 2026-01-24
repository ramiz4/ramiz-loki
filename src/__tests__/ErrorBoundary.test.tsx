import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ErrorBoundary } from '../components/ErrorBoundary';

// Component that throws an error
const ThrowError = () => {
  throw new Error('Test error');
};

// Component that renders successfully
const SuccessComponent = () => <div>Success</div>;

describe('ErrorBoundary', () => {
  // Suppress console.error for this test suite since we're intentionally throwing errors
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  test('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <SuccessComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Success')).toBeInTheDocument();
  });

  test('renders error UI when an error is thrown', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /We're sorry for the inconvenience. Please try refreshing the page./i,
      ),
    ).toBeInTheDocument();
  });

  test('displays error details when expanded', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    const detailsElement = screen.getByText('Error details');
    expect(detailsElement).toBeInTheDocument();

    // Check if error message is in the document
    expect(screen.getByText(/Test error/)).toBeInTheDocument();
  });

  test('renders custom fallback when provided', () => {
    const customFallback = <div>Custom Error Message</div>;

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Custom Error Message')).toBeInTheDocument();
    expect(
      screen.queryByText(/Oops! Something went wrong/i),
    ).not.toBeInTheDocument();
  });

  test('refresh button reloads the page', async () => {
    const user = userEvent.setup();

    // Mock window.location.reload
    const reloadMock = jest.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
      writable: true,
    });

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    const refreshButton = screen.getByRole('button', { name: /Refresh Page/i });
    await user.click(refreshButton);

    expect(reloadMock).toHaveBeenCalled();
  });
});
