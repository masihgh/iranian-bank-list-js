import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'dev'),  // <-- Set root to dev folder

  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'BankUtils',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: [],
    },
  },
  server: {
    open: true,  // Optional: open browser automatically
  },
});
