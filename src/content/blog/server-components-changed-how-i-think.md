---
title: "Server Components Changed How I Think About State"
date: "2025-11-14"
excerpt: "React Server Components aren't just a performance trick — they fundamentally shift where logic lives. Notes from rebuilding a dashboard around this model."
category: "Web Dev"
---

When I first read about React Server Components, I thought they were primarily a performance optimization — render on the server, ship less JavaScript. After rebuilding our analytics dashboard with them, I realized the bigger shift is architectural.

## The Old Mental Model

In a traditional React SPA, everything is a client component. Data fetching happens in `useEffect` or a data-fetching library. State management means choosing between Context, Redux, Zustand, or Jotai. The component tree is a single, interconnected unit that runs entirely in the browser.

## The New Mental Model

Server Components split your component tree into two worlds:

- **Server Components**: Run once on the server. They can directly access databases, filesystems, and APIs. They produce HTML. They never re-render.
- **Client Components**: Run in the browser. They handle interactivity, animations, and local state. They're the React you already know.

The insight is that **most of your UI doesn't need to be interactive**. A blog post, a product description, a data table — these are static once rendered. Only the search bar, the add-to-cart button, and the filter dropdown need client-side state.

## What Changed in Practice

### Data fetching became trivial

```tsx
// This is a Server Component — it runs on the server
async function DashboardMetrics() {
  const metrics = await db.query('SELECT * FROM daily_metrics');
  
  return (
    <div className="grid">
      {metrics.map(m => (
        <MetricCard key={m.id} label={m.name} value={m.value} />
      ))}
    </div>
  );
}
```

No `useEffect`. No loading states. No stale closures. The data is just... there.

### State became more intentional

When you have to explicitly opt into client-side behavior with `'use client'`, you think twice about what actually needs to be interactive. Our dashboard went from 47 client components to 12. The rest became server components that render once and ship zero JavaScript.

### The bundle shrank dramatically

Our dashboard JavaScript went from 340KB to 89KB gzipped. The server components — which made up 70% of the UI — contribute zero bytes to the client bundle.

## The Gotchas

It's not all smooth sailing. The mental model of "two worlds" takes time to internalize. You can't pass functions from server to client components. Composition patterns that worked before might need rethinking.

But overall? Server Components represent the most significant shift in React architecture since hooks. If you haven't tried them yet, start with a page that's mostly static content with a few interactive bits. You'll see the appeal immediately.
