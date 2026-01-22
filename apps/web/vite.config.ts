import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: __dirname,               // 👈 IMPORTANT
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    outDir: '../../dist/apps/web',
    emptyOutDir: true,
  },
});
