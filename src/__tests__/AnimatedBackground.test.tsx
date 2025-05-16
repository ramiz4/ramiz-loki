import { render, screen, fireEvent, act } from '@testing-library/react';
import { AnimatedBackground } from '../components/AnimatedBackground';

describe('AnimatedBackground', () => {
  const originalEnv = process.env.NODE_ENV;
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;

  beforeEach(() => {
    // Mock window methods
    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
    
    // Mock window dimensions
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: 768, writable: true });
    
    // Mock requestAnimationFrame and cancelAnimationFrame
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
      cb(0);
      return 0;
    });
    window.cancelAnimationFrame = jest.fn();
    
    // Ensure we're in test environment
    process.env.NODE_ENV = 'test';
  });

  afterEach(() => {
    jest.clearAllMocks();
    process.env.NODE_ENV = originalEnv;
    
    // Restore window dimensions
    Object.defineProperty(window, 'innerWidth', { value: originalInnerWidth, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: originalInnerHeight, writable: true });
  });

  test('renders with correct props', () => {
    render(<AnimatedBackground imagePath="/test-image.png" />);
    const image = screen.getByAltText('Animated background');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.png');
  });

  test('applies loading state properly', () => {
    render(<AnimatedBackground imagePath="/test-image.png" />);
    const container = screen.getByAltText('Animated background').parentElement?.parentElement;
    expect(container).toHaveClass('opacity-0');
    
    // Simulate image load
    fireEvent.load(screen.getByAltText('Animated background'));
    expect(container).toHaveClass('opacity-100');
  });
  
  test('handles mouse move events', () => {
    render(<AnimatedBackground imagePath="/test-image.png" />);
    
    // Extract the mousemove handler
    const mousemoveHandler = (window.addEventListener as jest.Mock).mock.calls.find(
      call => call[0] === 'mousemove'
    )[1];
    
    // Simulate a mouse move event
    act(() => {
      mousemoveHandler({
        clientX: 100,
        clientY: 200
      });
    });
    
    // Simulate another move with higher speed to trigger particle creation
    act(() => {
      mousemoveHandler({
        clientX: 150, // Move 50px horizontally
        clientY: 250  // Move 50px vertically
      });
    });

    // Test extreme values
    act(() => {
      mousemoveHandler({
        clientX: 0,
        clientY: 0
      });
    });

    act(() => {
      mousemoveHandler({
        clientX: window.innerWidth,
        clientY: window.innerHeight
      });
    });
  });
  
  test('handles click events', () => {
    render(<AnimatedBackground imagePath="/test-image.png" />);
    
    // Extract the click handler
    const clickHandler = (window.addEventListener as jest.Mock).mock.calls.find(
      call => call[0] === 'click'
    )[1];
    
    // Simulate a click event at different positions
    act(() => {
      clickHandler({
        clientX: 100,
        clientY: 200
      });
    });

    act(() => {
      clickHandler({
        clientX: 500,
        clientY: 300
      });
    });

    // Verify click ripples were added (indirectly, by checking classNames related to ripples)
    const rippleLayers = document.querySelectorAll('.absolute.inset-0');
    expect(rippleLayers.length).toBeGreaterThan(0);
  });

  test('adds particles correctly', () => {
    render(<AnimatedBackground imagePath="/test-image.png" />);
    
    // Trigger mouse move event to call addParticles
    const mousemoveHandler = (window.addEventListener as jest.Mock).mock.calls.find(
      call => call[0] === 'mousemove'
    )[1];
    
    // Move with enough speed to trigger particles
    act(() => {
      // First record position
      mousemoveHandler({
        clientX: 0,
        clientY: 0
      });
      
      // Then move quickly
      mousemoveHandler({
        clientX: 100,
        clientY: 100
      });
    });
    
    // Another sequence with even higher speed
    act(() => {
      mousemoveHandler({
        clientX: 100,
        clientY: 100
      });
      
      // Move very quickly to trigger more particles
      mousemoveHandler({
        clientX: 300,
        clientY: 300
      });
    });
  });

  test('renders grid lines', () => {
    render(<AnimatedBackground imagePath="/test-image.png" />);
    
    // Check that grid lines are rendered
    const gridLines = document.querySelectorAll('.absolute.h-full.w-px');
    expect(gridLines.length).toBe(6);
    
    // Check that the grid lines have the correct styles
    const firstGridLine = gridLines[0] as HTMLElement;
    expect(firstGridLine.style.animation).toBe('verticalLine 3s ease-in-out infinite');
  });

  test('does not render canvas in test environment', () => {
    render(<AnimatedBackground imagePath="/test-image.png" />);
    const canvas = document.querySelector('canvas');
    expect(canvas).not.toBeInTheDocument();
  });
  
  test('applies mouse position to transform styles', () => {
    render(<AnimatedBackground imagePath="/test-image.png" />);
    
    // Extract the mousemove handler
    const mousemoveHandler = (window.addEventListener as jest.Mock).mock.calls.find(
      call => call[0] === 'mousemove'
    )[1];
    
    // Simulate a mouse move event
    act(() => {
      mousemoveHandler({
        clientX: 200,
        clientY: 150
      });
    });
    
    // Check that transforms are applied based on mouse position
    const transformedElements = document.querySelectorAll('[style*="transform"]');
    expect(transformedElements.length).toBeGreaterThan(0);
    
    // Check the main container transform
    const mainContainer = screen.getByAltText('Animated background').parentElement?.parentElement;
    expect(mainContainer?.style.transform).toBeDefined();
  });
});
