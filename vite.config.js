// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'BankUtils', // Global var name in UMD build
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [], // externalize dependencies like 'lodash'
      output: {
        globals: {}, // for UMD builds if needed
      },
    },
  },
});
