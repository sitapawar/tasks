import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// base './' keeps asset paths relative so it works on https://<user>.github.io/<repo>/
export default defineConfig({
  base: './',
  plugins: [preact()],
});
