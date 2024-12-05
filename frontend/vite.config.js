import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // Enables source maps for easier debugging in production
    outDir: 'dist', // Build output directory
  },
  server: {
    port: 5173, // Set a different port for the development server
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Proxy API requests to your backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

