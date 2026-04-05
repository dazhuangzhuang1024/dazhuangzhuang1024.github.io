import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Root, Image } from 'mdast';
import path from 'node:path';

const remarkRelativeImages: Plugin<[], Root> = () => {
  return (tree: Root, vfile: any) => {
    const filePath: string | undefined = vfile.path || vfile.history?.[0];
    if (!filePath) return;

    const fileDir = path.dirname(filePath);
    const contentDir = path.resolve('content');

    visit(tree, 'image', (node: Image) => {
      const url = node.url;
      if (!url) return;

      const isRelative =
        !url.startsWith('/') &&
        !url.startsWith('http://') &&
        !url.startsWith('https://') &&
        !url.startsWith('data:');

      if (isRelative) {
        const absolute = path.resolve(fileDir, url);
        const rel = path.relative(contentDir, absolute);
        node.url = `/_ci/${rel}`;
      }
    });
  };
};

export default remarkRelativeImages;
