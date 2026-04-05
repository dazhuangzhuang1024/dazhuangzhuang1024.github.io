import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
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
    remarkPlugins: [remarkRelativeImages, remarkMath, remarkMermaid],
    rehypePlugins: [rehypeKatex],
  },
  vite: {
    plugins: [contentImagesPlugin()],
  },
});
