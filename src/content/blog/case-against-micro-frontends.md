---
title: "The Case Against Micro-Frontends (in 2026)"
date: "2026-02-15"
excerpt: "Micro-frontends promised independence but delivered coordination overhead. After running them for two years in production, here's an honest retrospective."
category: "Web Dev"
---

Two years ago, our team adopted micro-frontends with enthusiasm. Multiple teams, independent deployments, technology freedom — it sounded like the frontend equivalent of microservices. Here's what actually happened.

## The Promise

The pitch was compelling: each team owns a vertical slice of the application. They pick their own framework, deploy on their own schedule, and never block each other. In theory, this scales engineering organizations the way microservices scale backends.

## The Reality

### Shared state is still shared state

No matter how you slice the UI, some state is global: the authenticated user, the shopping cart, feature flags, the notification count. We ended up building a custom event bus and shared state library that every micro-frontend depended on. That "independence" started looking a lot like coupling with extra steps.

### Bundle size exploded

Even with Module Federation, we shipped three copies of React, two date-formatting libraries, and countless duplicate utilities. Our initial load went from 180KB to 620KB gzipped. Users on slower connections felt every kilobyte.

### Design consistency was a nightmare

When Team A uses Tailwind and Team B uses Styled Components, the "same" button looks subtly different. We hired a dedicated design systems engineer just to keep things consistent across micro-frontends. That's a full-time role that didn't exist before.

## What I'd Do Instead

For most teams, I'd recommend a **modular monolith** frontend:

- One repository, one build pipeline
- Strong module boundaries enforced by linting rules
- Shared component library with strict API contracts
- Code ownership via CODEOWNERS, not separate deployments

You get 90% of the organizational benefits without the architectural tax.

## When Micro-Frontends Make Sense

They're not always wrong. If you're integrating truly independent products (think a dashboard that embeds third-party widgets), or if you have 20+ teams that genuinely never need to coordinate, the overhead might be justified.

But for most organizations with 3-8 frontend teams? A well-structured monorepo will serve you better.
