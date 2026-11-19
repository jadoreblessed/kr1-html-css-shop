import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const pages = ['index', 'catalog', 'product', 'order', 'contacts'];

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        pages.map((page) => [page, fileURLToPath(new URL(`./${page}.html`, import.meta.url))]),
      ),
    },
  },
});
