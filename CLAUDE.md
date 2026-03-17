# Pulsar Chat

## About
Learning project for RAG, Svelte 5, and LLM integration. A minimal chat interface that communicates with `pulsar-api` (FastAPI backend) which handles RAG retrieval and LLM streaming responses.

**This is a public repository.** Never commit secrets, API keys, .env files, or any sensitive data. All API communication goes through pulsar-api — no direct LLM/RAG calls from frontend.

- **Author:** Adam Žúrek (https://github.com/zurek11)
- **Repo:** https://github.com/zurek11/pulsar-chat
- **Backend:** https://github.com/zurek11/pulsar-api

## Stack
- **Framework:** SvelteKit with Svelte 5 (runes)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4
- **Runtime & Package Manager:** Bun
- **Testing:** Vitest (unit) + Playwright (e2e)

## Project Structure
```
src/
├── lib/
│   ├── components/    # Reusable UI components
│   │   ├── chat/      # Chat-specific components (MessageBubble, ChatInput, etc.)
│   │   └── ui/        # Generic UI components (Button, Icon, etc.)
│   ├── stores/        # Svelte 5 rune-based state (.svelte.ts files)
│   ├── services/      # API client, streaming handler
│   ├── types/         # TypeScript interfaces and types
│   └── utils/         # Pure utility functions
├── routes/
│   └── +page.svelte   # Single page — the chat interface
├── app.html
└── app.css            # Tailwind base + custom theme
tests/
├── unit/              # Vitest unit tests
└── e2e/               # Playwright e2e tests
```

## Commands
- `bun install` — install dependencies
- `bun dev` — start dev server (port 5173)
- `bun run build` — production build
- `bun run preview` — preview production build
- `bun test:unit` — run Vitest unit tests
- `bun test:e2e` — run Playwright e2e tests
- `bun test` — run all tests
- `bun run lint` — ESLint check
- `bun run format` — Prettier format
- `bun run check` — svelte-check (type checking)

## Code Conventions

### Svelte 5 Runes
- Always use `$state()`, `$derived()`, `$effect()` — never legacy `$:` or stores API
- Use `$props()` with TypeScript interfaces for component props
- Prefer `$derived()` over `$effect()` for computed values
- State modules use `.svelte.ts` extension
- Never use `$state()` at module top-level in SSR context — isolate in components or classes

### TypeScript
- Strict mode, no `any` — use `unknown` if type is uncertain
- Named exports only, no default exports (except SvelteKit conventions)
- Interfaces over type aliases for object shapes
- All functions must have explicit return types

### Styling
- Tailwind utility classes only — no custom CSS files except `app.css`
- Use Tailwind CSS variables for theming (dark/light mode)
- Mobile-first responsive design

### Components
- One component per file
- Props interface defined at top of `<script>` block
- Event handlers prefixed with `handle` (e.g., `handleSubmit`, `handleKeydown`)
- Accessible by default — proper ARIA attributes, keyboard navigation

### API Communication
- All API calls go through `src/lib/services/api.ts`
- Streaming responses use `EventSource` or `fetch` with `ReadableStream`
- Backend URL configured via `PUBLIC_API_URL` env variable
- Error states always handled and displayed to user

## Important Notes
- The backend (pulsar-api) runs on `http://localhost:8000` by default
- Streaming endpoint: `POST /api/chat` with SSE response
- Clear history endpoint: `DELETE /api/chat/history`
- No authentication — this is a local-only learning project
- Keep bundle size minimal — avoid heavy dependencies
