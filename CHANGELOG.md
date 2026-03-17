# Changelog

All notable changes to Pulsar Chat — a learning project exploring RAG, Svelte 5, and LLM integration.

The format is inspired by [Keep a Changelog](https://keepachangelog.com/) but with more personality.

## [0.2.0] — 2026-03-17 — "First Contact"

The app can finally talk. This release wires up the full conversation loop — from the
moment you hit Enter to the last streamed token landing on screen. Dark theme, reactive
store, SSE streaming, stop button, clear history — the whole shebang.

### 🎉 Added

- `ChatWindow` — full-page layout with header, scrollable message list, empty state, and error banner
- `ChatInput` — auto-resizing textarea with send (Enter), stop (◼), and clear (🗑) buttons; Shift+Enter for newlines
- `MessageBubble` — user messages right-aligned in accent purple, assistant replies left-aligned on dark surface
- `TypingIndicator` — three-dot bounce animation while the assistant warms up
- `Button` — reusable UI component with primary/ghost/danger variants
- `chat.svelte.ts` — class-based rune store (`$state`, `$derived`) handling send, streaming, abort, and clear
- `api.ts` — `streamChat()` async generator consuming SSE tokens + `clearHistory()` DELETE call
- `chat.ts` — `Message` interface (id, role, content, createdAt)
- `app.css` — Tailwind v4 import with custom `--pulsar-*` dark theme tokens
- `@tailwindcss/vite` plugin wired into `vite.config.ts`
- Svelte 5 rune globals added to ESLint config for `.svelte.ts` files

### 🐛 Fixed

- Svelte 5 reactivity: mutations to streamed assistant messages now go through the reactive
  proxy (`this.messages[idx]`) instead of the stale local reference — tokens appear in real-time
  instead of all at once after the stream closes

### 🔧 Changed

- `eslint.config.js` — disabled `no-unused-vars` for `.svelte` files (false positives on
  function-type parameter names in interfaces); TypeScript strict mode + svelte-check cover this

---

## [0.1.1] — 2026-03-17 — "Read the Manual"

Skills don't invoke themselves. This patch fixes misleading skill configuration that caused
Claude Code to skip mandatory workflows — skill triggers now use explicit REQUIRED language,
and CLAUDE.md no longer claims skills are "automatically discovered."

### 🔧 Fixed

- All 6 skill `description` fields updated from soft "Use when…" to mandatory "REQUIRED when… Invoke this skill before…"
- CLAUDE.md skills section rewritten: removed false "automatically discovers" claim, added explicit invocation table

---

## [0.1.0] — 2026-03-17 — "The Big Bang"

Every pulsar has to start somewhere. This is the initial project
scaffold — bones, no flesh yet. The tooling is in place, the conventions
are set, and the first commit is done. Time to build something.

### 🎉 Added

- SvelteKit project with Svelte 5 runes
- Tailwind CSS 4 theming
- Vitest + Playwright testing setup
- Claude Code configuration (CLAUDE.md, skills, rules)
- Docker multi-stage build support

---
