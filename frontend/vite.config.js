import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: `${import.meta.env.VITE_APP_API_URL}`,
        changeOrigin: true,
      },
    },
  },
});