import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/ramiz-loki/', // Set base path for GitHub Pages (configurable via VITE_BASE_PATH env var)
});
