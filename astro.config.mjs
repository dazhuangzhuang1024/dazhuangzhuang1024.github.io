import { defineConfig } from 'astro/config';
import remarkMermaid from './src/plugins/remark-mermaid.ts';

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
    remarkPlugins: [remarkMermaid],
  },
});
