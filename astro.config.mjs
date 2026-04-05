import { defineConfig } from 'astro/config';
import remarkMermaid from './src/plugins/remark-mermaid.ts';
import remarkRelativeImages from './src/plugins/remark-relative-images.ts';
import { contentImagesPlugin } from './src/plugins/vite-content-images.ts';

export default defineConfig({
  outDir: './docs',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
    remarkPlugins: [remarkRelativeImages, remarkMermaid],
  },
  vite: {
    plugins: [contentImagesPlugin()],
  },
});
