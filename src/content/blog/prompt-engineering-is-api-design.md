---
title: "Prompt Engineering Is Just Good API Design"
date: "2025-10-22"
excerpt: "The skills that make you good at designing function signatures and API contracts translate directly to working with language models. Here's the mental model."
category: "AI/ML"
---

If you've ever designed a good REST API, written a clear function docstring, or structured a configuration file, you already have most of the skills for prompt engineering. The mental models are the same — we just haven't made the connection explicit.

## APIs and Prompts Share the Same Problems

When you design an API endpoint, you think about:

- **Input validation**: What are the expected types and ranges?
- **Output format**: What shape should the response take?
- **Error handling**: What happens with edge cases?
- **Documentation**: How do you make the contract clear?

Prompt engineering is the same exercise:

- **Input structure**: How do you format context so the model understands it?
- **Output specification**: How do you get structured, parseable responses?
- **Edge cases**: How do you handle ambiguity or missing information?
- **Clarity**: How do you make your intent unambiguous?

## Concrete Parallels

### Function signatures → System prompts

A well-typed function signature tells you everything about what a function expects and returns. A system prompt does the same for a language model.

Bad function signature:
```
def process(data) -> any
```

Bad system prompt:
```
You are a helpful assistant.
```

Good function signature:
```python
def extract_entities(text: str, entity_types: list[str]) -> list[Entity]
```

Good system prompt:
```
You are an entity extraction system. Given a text input and a 
list of entity types, return a JSON array of objects with keys 
"text", "type", and "confidence" (0-1 float).
```

### Schema validation → Output formatting

When building APIs, we use schemas (JSON Schema, Zod, Pydantic) to validate responses. With LLMs, we use structured output instructions and few-shot examples to achieve the same goal.

### API versioning → Prompt versioning

Just as API contracts shouldn't change silently, prompts that power production features should be version-controlled, tested, and reviewed like code.

## The Takeaway

You don't need to learn a new discipline to work with language models effectively. Apply the same engineering rigor you bring to API design: be specific about inputs, explicit about outputs, and test your edge cases.

The best prompt engineers I've worked with aren't AI researchers. They're backend engineers who treat prompts like code.
