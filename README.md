# 🌟 Pulsar Chat

A minimal chat interface for exploring Retrieval-Augmented Generation (RAG) with LLM streaming responses.

> **Learning project** — Built to learn RAG systems, Svelte 5, and LLM integration from scratch. Not intended for production use.

## What is this?

Pulsar Chat is the frontend part of a two-repo learning project:

- **[pulsar-chat](https://github.com/zurek11/pulsar-chat)** (this repo) — SvelteKit chat interface with streaming responses
- **[pulsar-api](https://github.com/zurek11/pulsar-api)** — FastAPI backend with RAG pipeline and LLM integration

The goal is to understand RAG end-to-end by building it, not by reading about it.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | SvelteKit + Svelte 5 (runes) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4 |
| Runtime | Bun |
| Testing | Vitest + Playwright |

## Getting Started

```bash
# Prerequisites: Bun (https://bun.sh)
curl -fsSL https://bun.sh/install | bash

# Clone and install
git clone https://github.com/zurek11/pulsar-chat.git
cd pulsar-chat
bun install

# Configure
cp .env.example .env
# Edit .env if your backend runs on a different port

# Start dev server
bun dev
```

Make sure [pulsar-api](https://github.com/zurek11/pulsar-api) is running on `http://localhost:8000`.

## Features

- 💬 Chat interface with streaming LLM responses
- 🗑️ Clear chat history
- ⚡ Real-time token streaming via SSE
- 📱 Responsive design

## Development

```bash
bun dev          # Start dev server (port 5173)
bun test:unit    # Run unit tests
bun test:e2e     # Run e2e tests
bun run check    # Type checking
bun run lint     # Linting
bun run format   # Code formatting
```

## What I Learned

_This section will be updated as the project progresses._

- [ ] SvelteKit project setup with Bun
- [ ] Svelte 5 runes ($state, $derived, $effect)
- [ ] Streaming API responses (SSE / ReadableStream)
- [ ] Tailwind CSS 4 theming
- [ ] Vitest + Playwright testing
- [ ] Claude Code workflow (CLAUDE.md, skills, settings)

## License

MIT
