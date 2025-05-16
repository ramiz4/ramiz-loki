// Test utility to ensure the canvas is only rendered in non-test environments

/**
 * This file simply verifies that our environment-aware rendering
 * for the AnimatedBackground component is working correctly.
 * 
 * In development/production: Canvas should be rendered
 * In test environment: Canvas should not be rendered
 */

import { AnimatedBackground } from '../components/AnimatedBackground';

// This is just used for manual verification, not an actual test
export function verifyCanvasRendering() {
  // In development/production, this should show the canvas
  // In test environment, this should not include the canvas
  const component = AnimatedBackground({ imagePath: '/hero-bg.png' });
  
  console.log('Current environment:', process.env.NODE_ENV);
  console.log('Canvas should be rendered:', process.env.NODE_ENV !== 'test');
  
  return component;
}
