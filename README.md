# Dev Portfolio & Blog

A personal developer portfolio and blog built with Next.js, styled with a dark editorial aesthetic, and deployed to GitHub Pages. Blog posts are written in Markdown — just add `.md` files and push.

## Quick Start

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
open http://localhost:3000
```

## Personalise

All your personal data lives in **one file**: `src/lib/data.ts`

Open it and update:

- `siteConfig.name` — your name
- `siteConfig.email` — your email
- `siteConfig.github` / `linkedin` / `twitter` — your socials
- `siteConfig.about` — your bio paragraphs
- `siteConfig.stats` — your numbers (years, projects, etc.)
- `projects` array — your real projects
- `techStack` array — your actual tech stack

## Writing Blog Posts

Add Markdown files to `src/content/blog/`. Each file needs frontmatter:

```markdown
---
title: "Your Post Title"
date: "2026-03-15"
excerpt: "A short description shown on the blog listing."
category: "Web Dev"
---

Your content here. Supports **bold**, *italic*, `code`,
code blocks, links, images, lists, blockquotes, and tables.
```

### Categories

Categories are color-coded automatically:
- **Systems / DevOps** → coral
- **Web / Web Dev** → cyan  
- **AI / AI/ML** → lavender
- Other categories get default styling

### File naming

The filename becomes the URL slug:
- `my-great-post.md` → `/blog/my-great-post`

## Deploy to GitHub Pages

### Option A: Username site (`username.github.io`)

1. Create a repo named `username.github.io`
2. Push this code to the `main` branch
3. Go to **Settings → Pages → Source** → select **GitHub Actions**
4. The workflow will build and deploy automatically on every push

### Option B: Project site (`username.github.io/repo-name`)

1. Create a repo with any name
2. Open `next.config.js` and uncomment + update:
   ```js
   basePath: '/your-repo-name',
   assetPrefix: '/your-repo-name/',
   ```
3. Push to `main`
4. Go to **Settings → Pages → Source** → select **GitHub Actions**

### Manual deploy (alternative)

```bash
# Install gh-pages if not already
npm install -D gh-pages

# Build and deploy
npm run deploy
```

## Project Structure

```
├── .github/workflows/deploy.yml  ← Auto-deploy on push
├── src/
│   ├── app/
│   │   ├── layout.tsx             ← Root layout (nav + footer)
│   │   ├── page.tsx               ← Homepage
│   │   ├── page.module.css        ← Homepage styles
│   │   ├── globals.css            ← Design system + prose styles
│   │   └── blog/
│   │       ├── page.tsx           ← Blog listing
│   │       └── [slug]/
│   │           └── page.tsx       ← Individual blog post
│   ├── components/
│   │   ├── Navbar.tsx             ← Fixed navigation
│   │   ├── Footer.tsx             ← Site footer
│   │   ├── Reveal.tsx             ← Scroll animation wrapper
│   │   └── StackMarquee.tsx       ← Auto-scrolling tech stack
│   ├── content/
│   │   └── blog/                  ← YOUR BLOG POSTS GO HERE
│   │       ├── my-first-post.md
│   │       └── another-post.md
│   └── lib/
│       ├── blog.ts                ← Markdown parser
│       └── data.ts                ← YOUR PERSONAL DATA
├── next.config.js
├── package.json
└── tsconfig.json
```

## Adding New Sections

The site is built with standard Next.js App Router patterns. To add a new page (e.g. `/uses`):

1. Create `src/app/uses/page.tsx`
2. Add a link in `src/components/Navbar.tsx`

## Tech Stack

- **Next.js 14** — Static site generation
- **TypeScript** — Type safety
- **CSS Modules** — Scoped styling
- **gray-matter** — Markdown frontmatter parsing
- **react-markdown** — Markdown rendering
- **remark-gfm** — GitHub Flavored Markdown support
- **GitHub Actions** — CI/CD pipeline

## License

MIT — use it however you like.
