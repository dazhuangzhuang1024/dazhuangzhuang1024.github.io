import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Root, Code } from 'mdast';

const remarkMermaid: Plugin<[], Root> = () => {
  return (tree: Root) => {
    visit(tree, 'code', (node: Code, index, parent) => {
      if (node.lang === 'mermaid' && parent && index !== undefined) {
        parent.children[index] = {
          type: 'html',
          value: `<div class="mermaid">${node.value}</div>`,
        } as any;
      }
    });
  };
};

export default remarkMermaid;
