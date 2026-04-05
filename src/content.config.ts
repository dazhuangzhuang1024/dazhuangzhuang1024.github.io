import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({
    pattern: '**/index.md',
    base: './content/blog',
    generateId: ({ entry }) => entry.replace(/\.[^.]+$/, '').replace(/\/index$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
