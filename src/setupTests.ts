import '@testing-library/jest-dom';
import 'intersection-observer';
import { TextEncoder } from 'util';

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];

  constructor() {
    this.observe = jest.fn();
    this.unobserve = jest.fn();
    this.disconnect = jest.fn();
  }

  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

global.IntersectionObserver = MockIntersectionObserver;

// Add TextEncoder and TextDecoder polyfills for React Router DOM
global.TextEncoder = TextEncoder;

// Mock canvas-related functionality
jest.mock('canvas', () => ({
  createCanvas: jest.fn(() => ({
    getContext: jest.fn(() => ({
      measureText: jest.fn(() => ({ width: 0 })),
      fillText: jest.fn(),
      fill: jest.fn(),
      beginPath: jest.fn(),
      stroke: jest.fn(),
      clearRect: jest.fn(),
      arc: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
    })),
    width: 0,
    height: 0,
  })),
}));
