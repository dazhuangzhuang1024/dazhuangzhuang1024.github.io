# My Blog

[中文说明](README_CN.md)

A static blog site built with [Astro](https://astro.build/), featuring Mermaid diagram support, syntax highlighting, GitHub-based comments, and GitHub Pages deployment.

## Features

- Markdown blog posts with YAML front matter
- **Content separated from source code** — write in `content/`, build from `src/`
- **Per-article image directories** — colocate images with their posts
- Syntax highlighting (Shiki, github-dark theme)
- Mermaid diagram rendering (flowcharts, sequence diagrams, etc.)
- Tag filtering and search
- Table of contents outline on post pages
- GitHub-based comments via [giscus](https://giscus.app/)
- Responsive, modern design with dark mode
- GitHub Pages ready

## Project Structure

```
├── content/                # ✏️ All your writing lives here
│   ├── about.md            # About page content
│   └── blog/
│       ├── my-post/
│       │   ├── index.md    # Post content
│       │   └── images/     # Post-specific images
│       └── another-post/
│           └── index.md
├── src/                    # 🔧 Website source code
│   ├── content.config.ts   # Content collection definition
│   ├── layouts/            # BaseLayout.astro
│   ├── pages/              # index.astro, about.astro, posts/[slug].astro
│   ├── plugins/            # Remark & Vite plugins
│   └── styles/             # global.css
├── public/images/          # Shared site images (avatar, favicon, etc.)
├── docs/                   # Built output (GitHub Pages serves from here)
├── astro.config.mjs
└── package.json
```

## Quick Start

```bash
npm install
npm run build
npm run preview
```

Open http://localhost:4321 to see your blog.

## Writing Posts

### Create a New Post

Create a directory under `content/blog/` with an `index.md` file:

```
content/blog/my-new-post/
└── index.md
```

```markdown
---
title: "My Post Title"
date: 2026-03-20
description: "A short description of the post."
tags: ["tag1", "tag2"]
---

Your content here...
```

**Required fields:** `title`, `date`
**Optional fields:** `description`, `tags`

The directory name becomes the URL slug — `my-new-post/index.md` → `/posts/my-new-post`.

### Images

Place images in the `images/` folder next to your `index.md` and use **relative paths**:

```
content/blog/my-post/
├── index.md
└── images/
    ├── screenshot.png
    └── diagram.svg
```

```markdown
![Screenshot](./images/screenshot.png)
![Diagram](./images/diagram.svg)
```

Relative image paths are automatically resolved during build. Shared site-wide images (avatar, favicon) still go in `public/images/`.

### Using Typora

1. Open the article directory (e.g., `content/blog/my-post/`) in Typora
2. Configure Typora image settings:
   - Go to **Preferences → Image**
   - Set "When Insert" to **Copy image to custom folder**
   - Set the custom folder to: `./images`
   - Check **Use relative path**
3. Write your post — paste images directly and Typora saves them alongside your content
4. After writing, run `npm run build` to generate the site

### Videos

Use HTML in your markdown:

```markdown
<video src="/videos/demo.mp4" controls width="100%"></video>
```

Or embed YouTube:

```markdown
<iframe width="100%" height="400" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>
```

### Mermaid Diagrams

Use fenced code blocks with the `mermaid` language:

````markdown
```mermaid
flowchart TD
    A[Start] --> B[End]
```
````

## Deploy to GitHub Pages

1. Create a GitHub repo (e.g., `username.github.io`)
2. Push this project to the repo
3. Go to repo **Settings → Pages**
4. Set Source to **Deploy from a branch**
5. Set Branch to `main`, folder to `/docs`
6. Your blog is live at `https://username.github.io`

### Workflow

```bash
# 1. Create a new post
mkdir content/blog/my-new-post
# 2. Write content/blog/my-new-post/index.md
# 3. Build
npm run build
# 4. Commit and push
git add .
git commit -m "new post"
git push
```

## Enable Comments (giscus)

1. Install giscus on your repo: https://github.com/apps/giscus
2. Enable Discussions: repo Settings → General → Features → Discussions
3. Go to https://giscus.app/ and enter your repo name
4. Copy the generated values and update `src/pages/posts/[slug].astro`:
   - `data-repo` → your repo (e.g., `username/username.github.io`)
   - `data-repo-id` → from giscus.app
   - `data-category-id` → from giscus.app
5. Rebuild and push

## Customize

### About Page

Edit `content/about.md`:

- **Front matter** controls your name, avatar, GitHub link, and email
- **Body** is your bio written in standard markdown

```markdown
---
name: "Your Name"
github: "https://github.com/YOUR_USERNAME"
github_username: "YOUR_USERNAME"
email: "your@email.com"
avatar: "/images/avatar.jpg"
---

Your bio here in markdown...
```

Place your avatar at `public/images/avatar.jpg`.

### Other Customizations

- **Blog name:** Edit `src/layouts/BaseLayout.astro` (header and footer)
- **Styling:** Edit `src/styles/global.css`
- **Output directory:** Change `outDir` in `astro.config.mjs`
