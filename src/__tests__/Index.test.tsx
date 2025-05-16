import { createRoot } from 'react-dom/client';

// Mock React DOM
jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn(),
  })),
}));

// Mock App component
jest.mock('../App', () => {
  return {
    App: function MockApp() {
      return Object.create(null);
    },
  };
});

describe('Index / Entry point', () => {
  let originalConsoleError: typeof console.error;

  beforeAll(() => {
    // Save original console.error
    originalConsoleError = console.error;
    // Mock console.error to prevent React warnings from cluttering test output
    console.error = jest.fn();
  });

  afterAll(() => {
    // Restore original console.error
    console.error = originalConsoleError;
  });

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Create root element
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
  });

  afterEach(() => {
    // Clean up root element
    const root = document.getElementById('root');
    if (root) {
      document.body.removeChild(root);
    }
  });

  test('renders App component in root element', async () => {
    // Import the index.tsx module in isolation
    await jest.isolateModules(async () => {
      // Use dynamic import instead of require
      await import('../index');
    });

    // Verify createRoot was called with the root element
    expect(createRoot).toHaveBeenCalledWith(expect.any(HTMLElement));

    const mockRoot = (createRoot as jest.Mock).mock.results[0].value;
    expect(mockRoot.render).toHaveBeenCalledWith(expect.any(Object));
  });
  
  test('throws error when root element is not found', () => {
    // Mock getElementById to return null
    const originalGetElementById = document.getElementById;
    document.getElementById = jest.fn().mockReturnValue(null);

    // The error should be thrown when we require the module
    expect(() => {
      jest.isolateModules(() => {
        require('../index');
      });
    }).toThrow('Root element not found');

    // Restore the original implementation
    document.getElementById = originalGetElementById;
  });
});
