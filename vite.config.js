import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const pages = ['index', 'catalog', 'product', 'order', 'contacts'];

export default defineConfig({
  root: fileURLToPath(new URL('./src/', import.meta.url)),
  publicDir: '../public',
  base: './',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: Object.fromEntries(
        pages.map((page) => [page, fileURLToPath(new URL(`./src/${page}.html`, import.meta.url))]),
      ),
    },
  },
});
