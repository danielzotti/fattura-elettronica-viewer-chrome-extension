import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: resolve(rootDir, 'entrypoints/viewer'),
  publicDir: resolve(rootDir, 'public'),
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
});
