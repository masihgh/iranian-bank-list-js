import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  // REMOVE or comment out this line:
  // root: path.resolve(__dirname, 'dev'),

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
});
