import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    port: 5173
  },
  preview: {
    port: 5173
  },
  optimizeDeps: {
    exclude: ['svelte-codemirror-editor', 'codemirror', '@codemirror/lang-html']
  }
});
