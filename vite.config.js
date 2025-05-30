// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: '.', // default root

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
    open: false,
  }
});
