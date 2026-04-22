import type { Plugin } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

const MIME_TYPES: Record<string, string> = {
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.html': 'text/html',
};

const IMAGE_EXTS = new Set(Object.keys(MIME_TYPES));

export function contentImagesPlugin(): Plugin {
  let root: string;
  let outDir: string;

  return {
    name: 'vite-content-images',

    configResolved(config) {
      root = config.root;
      outDir = path.resolve(config.root, config.build.outDir);
    },

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith('/_ci/')) return next();

        const relativePath = decodeURIComponent(req.url.slice('/_ci/'.length));
        const filePath = path.join(root, 'content', relativePath);

        if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
          return next();
        }

        const ext = path.extname(filePath).toLowerCase();
        res.setHeader('Content-Type', MIME_TYPES[ext] || 'application/octet-stream');
        res.setHeader('Cache-Control', 'no-cache');
        fs.createReadStream(filePath).pipe(res);
      });
    },

    async closeBundle() {
      const contentDir = path.join(root, 'content');
      if (!fs.existsSync(contentDir)) return;

      const ciDir = path.join(outDir, '_ci');

      async function copyImages(dir: string) {
        const entries = await fs.promises.readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
          const srcPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            await copyImages(srcPath);
          } else {
            const ext = path.extname(entry.name).toLowerCase();
            if (IMAGE_EXTS.has(ext)) {
              const rel = path.relative(contentDir, srcPath);
              const destPath = path.join(ciDir, rel);
              await fs.promises.mkdir(path.dirname(destPath), { recursive: true });
              await fs.promises.copyFile(srcPath, destPath);
            }
          }
        }
      }

      await copyImages(contentDir);
    },
  };
}
