---
title: "Using Mermaid Diagrams in Blog Posts"
date: 2026-03-19
description: "A quick demo of how Mermaid diagrams render beautifully in our blog posts."
tags: ["mermaid", "diagrams", "tutorial"]
---

## Diagrams Made Easy

One of the cool features of this blog is built-in support for Mermaid diagrams. Just write them in fenced code blocks and they render automatically.

### A Simple Flowchart

```mermaid
flowchart TD
    A[Write Markdown] --> B[Add Mermaid Block]
    B --> C[Build Site]
    C --> D[Diagrams Rendered]
```

### Sequence Diagram

Here's how a typical API request flows:

```mermaid
sequenceDiagram
    participant Browser
    participant Server
    participant Database
    Browser->>Server: GET /api/posts
    Server->>Database: Query posts
    Database-->>Server: Return results
    Server-->>Browser: JSON response
```

### Mixing Code and Diagrams

You can freely mix regular code blocks with Mermaid diagrams. Here's some TypeScript:

```typescript
interface BlogPost {
  title: string;
  date: Date;
  description?: string;
}
```

And that's it — diagrams and code living happily together.
