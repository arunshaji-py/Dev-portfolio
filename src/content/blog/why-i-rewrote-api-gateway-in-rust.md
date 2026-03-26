---
title: "Why I Rewrote Our API Gateway in Rust"
date: "2026-03-10"
excerpt: "When latency went from a nice-to-have to a hard constraint, we had to rethink everything. Here's what switching from Node to Rust taught us about performance, memory, and trade-offs."
category: "Systems"
---

When we started hitting p99 latency spikes above 200ms on our API gateway, we knew something had to change. The Node.js service had served us well for two years, but as traffic grew from 10k to 100k requests per second, garbage collection pauses became our worst enemy.

## The Problem

Our gateway handled authentication, rate limiting, request routing, and response transformation. Each of these steps added latency, and under load, the event loop would occasionally stall for 50-80ms during GC pauses.

We tried the usual optimizations:
- Object pooling to reduce allocations
- Streaming responses instead of buffering
- Splitting into multiple processes with `cluster`

These helped, but they were band-aids. The fundamental issue was that Node.js gives you very little control over memory layout and allocation patterns.

## Why Rust?

We evaluated Go and Rust. Go would have been the safer choice — easier to hire for, faster to prototype. But Rust offered two things we needed:

1. **Predictable latency** — no garbage collector means no surprise pauses
2. **Zero-cost abstractions** — we could write high-level code without runtime overhead

The trade-off was development speed. Our team had no Rust experience, so we budgeted three months for what would have been a three-week Go rewrite.

## The Results

After six weeks of development (we got faster than expected), the numbers spoke for themselves:

- **p99 latency**: 180ms → 12ms
- **Memory usage**: 512MB → 38MB
- **Throughput**: 100k → 340k req/s on the same hardware

## Lessons Learned

Rust's borrow checker was painful for the first two weeks, then became our best friend. It caught entire categories of bugs at compile time that would have been race conditions or memory leaks in other languages.

The biggest surprise? **The hardest part wasn't Rust itself — it was redesigning our middleware chain** to work with Rust's ownership model. We ended up with a cleaner architecture because the language forced us to think about data flow more carefully.

Would I recommend this path for every team? No. But if latency is a hard constraint and you have the patience to invest in the learning curve, Rust delivers on its promises.
