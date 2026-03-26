---
title: "Building AI Features Without the Hype"
date: "2026-01-20"
excerpt: "Not every feature needs a large language model. A practical guide to deciding when AI adds genuine value to your product — and when a simple heuristic wins."
category: "AI/ML"
---

Every product roadmap in 2026 has an "AI" section. That's not inherently bad — language models and ML techniques genuinely unlock capabilities that weren't possible five years ago. But the rush to add AI everywhere has led to some questionable decisions.

Here's the framework I use to decide whether a feature should use AI or something simpler.

## The Decision Matrix

Ask two questions:

1. **Is the input space unbounded?** If users can type or say anything, you probably need ML. If they're choosing from a menu, you probably don't.
2. **Is perfect accuracy required?** If a wrong answer causes real harm (financial, medical, legal), the bar for AI is much higher.

### High value for AI
- Natural language search across unstructured documents
- Summarizing long content (meeting notes, articles, support tickets)
- Translating between languages or technical jargon levels
- Generating first drafts that humans will edit

### Low value for AI (use heuristics instead)
- Categorizing items into known buckets (use rules or a simple classifier)
- Recommending "similar" items (collaborative filtering still wins)
- Autocomplete for structured fields (trie-based search is faster and cheaper)
- Data validation (regex and schema validation are deterministic)

## The Cost Nobody Talks About

LLM API calls cost money, add latency, and introduce non-determinism. For a feature that runs millions of times per day, even $0.001 per call adds up to $30k/month. A heuristic running on your server costs effectively nothing.

More importantly, **non-deterministic features are harder to test, debug, and maintain**. When a user reports a bug in an AI feature, reproducing it is often impossible because the same input produces different outputs.

## A Practical Example

We needed a feature to auto-tag support tickets. The PM wanted GPT-4. I suggested we start with keyword matching and a decision tree trained on historical data.

The simple approach handled 87% of tickets correctly. We added an LLM fallback for the remaining 13% that didn't match any rules. Total cost: 85% less than running everything through an LLM, with faster response times and easier debugging for the majority of cases.

## The Takeaway

AI is a tool, not a strategy. Start with the simplest solution that could work. Measure whether it's good enough. Only reach for ML when simpler approaches genuinely fall short.

Your users don't care whether a feature uses AI. They care whether it works.
