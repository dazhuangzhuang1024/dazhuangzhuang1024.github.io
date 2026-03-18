# Implementation Plan: Markdown Blog Site

## Overview

Build an Astro-based static blog site that converts markdown posts into a styled HTML website with syntax highlighting, Mermaid diagram support, and GitHub Pages deployment. Each task builds incrementally so the site is functional at each checkpoint.

## Tasks

- [x] 1. Scaffold Astro project and install dependencies
  - Initialize Astro project in the workspace root
  - Install dependencies: `astro`, `@astrojs/markdown-remark`, `sharp` (if needed for images)
  - Install `mermaid` (for client-side rendering reference)
  - Verify `package.json` is created with correct dependencies
  - _Requirements: 5.1_

- [x] 2. Configure Astro for GitHub Pages output
  - [x] 2.1 Create `astro.config.mjs` with output directory set to `docs/`
    - Configure Shiki for syntax highlighting
    - Register the custom remark-mermaid plugin (to be created in task 3)
    - Set `trailingSlash` and `build.format` for clean URLs
    - _Requirements: 5.4, 6.1, 6.2, 6.3, 6.4_

- [x] 3. Implement remark-mermaid plugin
  - [x] 3.1 Create `src/plugins/remark-mermaid.ts`
    - Walk the MDAST tree to find code nodes with `lang: "mermaid"`
    - Transform matching nodes into raw HTML `<div class="mermaid">` containers
    - Preserve the mermaid source code inside the container
    - Do not apply syntax highlighting to mermaid blocks
    - _Requirements: 1.5, 8.1_

  - [ ]* 3.2 Write property test for remark-mermaid plugin
    - **Property 4: Mermaid blocks preserved in container**
    - **Validates: Requirements 1.5, 8.1**

- [x] 4. Define content collection schema
  - [x] 4.1 Create `src/content.config.ts` with Zod blog schema
    - Define `title` as required string
    - Define `date` as required date
    - Define `description` as optional string
    - Register the `blog` collection pointing to `src/content/blog/`
    - _Requirements: 1.1, 1.6, 1.7_

  - [ ]* 4.2 Write property test for front matter extraction
    - **Property 1: Front matter extraction**
    - **Validates: Requirements 1.1**

  - [ ]* 4.3 Write property test for invalid front matter errors
    - **Property 5: Invalid front matter produces descriptive errors**
    - **Validates: Requirements 1.6, 1.7**

- [x] 5. Create base layout component
  - [x] 5.1 Create `src/layouts/BaseLayout.astro`
    - Include `<head>` with charset meta, viewport meta, and dynamic `<title>`
    - Render site header with blog name and link to index page
    - Render site footer
    - Accept a `hasMermaid` prop to conditionally include Mermaid.js CDN script
    - Include `<slot />` for page content
    - _Requirements: 7.1, 7.2, 7.3, 8.3, 8.4_

  - [ ]* 5.2 Write property test for page structure
    - **Property 12: Page structure includes valid head, header, and footer**
    - **Validates: Requirements 7.1, 7.2, 7.3**

  - [ ]* 5.3 Write property test for conditional Mermaid.js script inclusion
    - **Property 13: Conditional Mermaid.js script inclusion**
    - **Validates: Requirements 8.3, 8.4**

- [x] 6. Create global CSS stylesheet
  - [x] 6.1 Create `src/styles/global.css`
    - Modern sans-serif font stack with appropriate line heights
    - Constrained content width (e.g., max-width ~720px) with centered layout
    - Responsive fluid layout for desktop and mobile
    - Styled code blocks with subtle background, rounded corners, monospace font
    - Restrained color palette with high contrast text and subtle accents
    - Hover states and smooth transitions for links and interactive elements
    - Centered mermaid diagram containers with appropriate spacing
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

- [x] 7. Checkpoint - Verify project structure
  - Ensure the project builds without errors (`astro build`), ask the user if questions arise.

- [x] 8. Implement index page
  - [x] 8.1 Create `src/pages/index.astro`
    - Fetch all blog posts from the `blog` content collection
    - Sort posts by date in reverse chronological order (newest first)
    - Render each post entry with title, date, and description
    - Link each entry to its corresponding post page URL
    - Show an empty-state message if no posts exist
    - Use `BaseLayout` with page title
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [ ]* 8.2 Write property test for index page completeness
    - **Property 7: Index page lists all posts with metadata in reverse chronological order**
    - **Validates: Requirements 2.1, 2.2, 2.3, 2.4**

- [x] 9. Implement individual post page with navigation
  - [x] 9.1 Create `src/pages/posts/[slug].astro`
    - Use `getStaticPaths` to generate a page for each blog post
    - Render the post's HTML content, title, and date
    - Include a link back to the index page
    - Compute and render previous/next post navigation links based on chronological order
    - Omit previous link for the earliest post, omit next link for the latest post
    - Detect mermaid content in the rendered HTML and pass `hasMermaid` prop to `BaseLayout`
    - Configure Mermaid.js with `securityLevel: 'strict'` and error display enabled
    - Use `BaseLayout` with post title
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 8.2, 8.3, 8.4, 8.5, 8.6_

  - [ ]* 9.2 Write property test for post page content
    - **Property 8: Post page contains content, metadata, and index link**
    - **Validates: Requirements 3.1, 3.2**

  - [ ]* 9.3 Write property test for post navigation correctness
    - **Property 9: Post navigation correctness**
    - **Validates: Requirements 3.3, 3.4, 3.5**

- [x] 10. Move existing markdown posts into content directory
  - Move `posts/hello-world.md` to `src/content/blog/hello-world.md`
  - Verify front matter is compatible with the Zod schema (title, date, description)
  - _Requirements: 1.1, 5.1_

- [x] 11. Checkpoint - Build and verify the site
  - Run `astro build` and confirm the `docs/` directory is generated with index.html and post pages
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- The site uses TypeScript/Astro throughout — all code examples should use `.astro` and `.ts` files
- The existing `posts/hello-world.md` file is moved (not copied) into the Astro content directory
