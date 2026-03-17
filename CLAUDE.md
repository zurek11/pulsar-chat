# Pulsar Chat

## About

Learning project for RAG, Svelte 5, and LLM integration. A minimal chat interface that communicates with `pulsar-api` (FastAPI backend) which handles RAG retrieval and LLM streaming responses.

**⚠️ This is a PUBLIC repository.** Never commit secrets, API keys, .env files, or any sensitive data. All API communication goes through pulsar-api — no direct LLM/RAG calls from frontend.

- **Author:** Adam Žúrek (https://github.com/zurek11)
- **Repo:** https://github.com/zurek11/pulsar-chat
- **Backend:** https://github.com/zurek11/pulsar-api

## Stack

- **Framework:** SvelteKit with Svelte 5 (runes)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4
- **Runtime & Package Manager:** Bun
- **Testing:** Vitest (unit) + Playwright (e2e)
- **Containerization:** Docker (multi-stage build)

## Project Structure

```
src/
├── lib/
│   ├── components/    # Reusable UI components
│   │   ├── chat/      # Chat-specific (MessageBubble, ChatInput, etc.)
│   │   └── ui/        # Generic (Button, Icon, etc.)
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

## Architecture & Decisions

See `ARCHITECTURE.md` for the full project vision, technology rationale, RAG learning phases,
component architecture diagrams, data flow, API contract, and development workflow.
Claude Code: read this file when working on cross-cutting concerns or when you need to
understand why a specific technology or pattern was chosen.

## Commands

- `bun install` — install dependencies (local to ./node_modules, no global pollution)
- `bun dev` — start dev server (port 5173)
- `bun run build` — production build
- `bun run preview` — preview production build
- `bun test:unit` — run Vitest unit tests
- `bun test:e2e` — run Playwright e2e tests
- `bun test` — run all tests
- `bun run lint` — ESLint check
- `bun run format` — Prettier format
- `bun run check` — svelte-check (type checking)

### Docker

- `docker build -t pulsar-chat .` — build image
- `docker run -p 3000:3000 pulsar-chat` — run container

## Code Conventions

### Svelte 5 Runes

- Always use `$state()`, `$derived()`, `$effect()` — never legacy `$:` or stores API
- Use `$props()` with TypeScript interfaces for component props
- Prefer `$derived()` over `$effect()` for computed values
- State modules use `.svelte.ts` extension
- Never use `$state()` at module top-level in SSR context

### TypeScript

- Strict mode, no `any` — use `unknown` if type is uncertain
- Named exports only, no default exports (except SvelteKit conventions)
- Interfaces over type aliases for object shapes
- All functions must have explicit return types

### Styling

- Tailwind utility classes only — no custom CSS files except `app.css`
- Mobile-first responsive design

### Components

- One component per file
- Props interface defined at top of `<script>` block
- Event handlers prefixed with `handle` (e.g., `handleSubmit`)
- Accessible by default — proper ARIA attributes, keyboard navigation
- Use `data-testid` attributes for e2e test selectors

### API Communication

- All API calls go through `src/lib/services/api.ts`
- Streaming responses use `fetch` with `ReadableStream`
- Backend URL configured via `PUBLIC_API_URL` env variable
- Error states always handled and displayed to user

## Git Workflow

### Commit Messages — Emoji Conventional Commits

```
🎉 feat: add message streaming component
🐛 fix: resolve input focus loss on re-render
♻️ refactor: extract chat state into rune module
🧪 test: add unit tests for ChatInput
📝 docs: update README with setup instructions
🔧 chore: update dependencies
🐳 docker: optimize multi-stage build
🚀 release: v0.2.0
```

### Branch Flow

Claude Code creates feature branches, pushes, and opens PRs. Adam reviews and merges.

- `main` — stable, versioned releases only
- `feat/[description]` — new features
- `fix/[description]` — bug fixes
- No develop branch. Feature branches → PR → main.

### PR Workflow

1. Create branch from main
2. Implement + write tests
3. Run: `bun test:unit && bun run check && bun run lint && bun run format`
4. Bump version (semver) + update CHANGELOG.md
5. Commit + push
6. Create PR titled "🚀 Release vX.Y.Z" with changelog in body
7. Add `zurek11` as reviewer
8. Adam reviews on GitHub — can tag `@claude` directly in PR for automatic fixes, or return to Claude Code locally

### Versioning

Semantic versioning in `package.json`. See `.claude/skills/release/SKILL.md` for details.

## Claude Code Configuration

### Skills (`.claude/skills/`)

Skills are NOT auto-applied. Claude Code MUST invoke each skill explicitly via the Skill tool
before the corresponding work begins. Skills are mandatory, not optional suggestions.

| Skill                | MUST invoke before…                                          |
| -------------------- | ------------------------------------------------------------ |
| **svelte-component** | creating any new `.svelte` file                              |
| **api-integration**  | writing any `fetch` or SSE streaming code                    |
| **testing**          | creating or modifying test files                             |
| **git-workflow**     | any `git push` or `gh pr create`                             |
| **release**          | bumping version in `package.json` or creating a PR to `main` |
| **docker**           | editing the `Dockerfile` or any container config             |

### Rules (`.claude/rules/`)

- **security.md** — public repo safety rules (always active)

### Ignored (`.claudeignore`)

Claude Code skips: node_modules, .svelte-kit, build, .env files, test artifacts.

## Important Notes

- The backend (pulsar-api) runs on `http://localhost:8000` by default
- Streaming endpoint: `POST /api/chat` with SSE response
- Clear history endpoint: `DELETE /api/chat/history`
- No authentication — this is a local-only learning project
- Keep bundle size minimal — avoid heavy dependencies
- GitHub CLI (`gh`) is used for PR creation from Claude Code
