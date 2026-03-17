---
name: release
description: 'REQUIRED when creating a release PR to main or bumping the version. Invoke this skill before touching package.json version or running gh pr create targeting main.'
allowed-tools: Read, Write, Edit, Bash(bun:*), Bash(git:*), Bash(gh:*)
---

# Release & Versioning

## When to Use

- Bumping version before a PR
- Writing or updating CHANGELOG.md
- Creating a release PR to main

## Semantic Versioning

Version lives in `package.json` → `"version": "X.Y.Z"`

| Bump          | When                                 | Example       |
| ------------- | ------------------------------------ | ------------- |
| **MAJOR** (X) | Breaking API changes, major rewrites | 0.x → 1.0.0   |
| **MINOR** (Y) | New features, backward compatible    | 0.1.0 → 0.2.0 |
| **PATCH** (Z) | Bug fixes, small improvements        | 0.2.0 → 0.2.1 |

During v0.x.x (pre-1.0), treat MINOR as "new features" and PATCH as "fixes/tweaks".

## CHANGELOG.md Format

The changelog should be **fun to read** — not a dry list. Each release gets a nickname and personality.

```markdown
# Changelog

All notable changes to Pulsar Chat.

## [0.3.0] — 2026-03-20 — "Talkative Pulsar"

Time to chat! This release brings the full conversation loop to life.

### 🎉 Added

- Streaming message display — watch tokens arrive in real-time
- Clear history button with satisfying fade-out animation
- Auto-scroll that actually works (finally)

### 🐛 Fixed

- Input no longer loses focus when assistant starts responding
- Message timestamps now show local time, not UTC (oops)

### ♻️ Changed

- Refactored chat store to use class-based rune pattern
- Upgraded Tailwind to v4.1

---

## [0.2.0] — 2026-03-18 — "First Words"

The chat window exists! You can type things and see them appear.
Baby steps, but meaningful ones.

### 🎉 Added

- ChatInput component with auto-resize textarea
- MessageBubble with user/assistant styling
- ChatWindow with message list layout

### 🧪 Tested

- Unit tests for all chat components
- E2E test for basic send flow

---

## [0.1.0] — 2026-03-17 — "The Big Bang"

Every pulsar has to start somewhere. This is the initial project
scaffold — bones, no flesh yet.

### 🎉 Added

- SvelteKit project with Svelte 5 runes
- Tailwind CSS 4 theming
- Vitest + Playwright setup
- Claude Code configuration (CLAUDE.md, skills, rules)
- Docker support
```

### Tone Guide for Release Notes

- Each version gets a **nickname** — space/astronomy themed preferred but not required
- Open with 1-2 sentences that tell the STORY of this release
- Use emojis in section headers
- Be honest and human: "finally", "oops", "baby steps" are encouraged
- Mention the WHY, not just the WHAT
- Someone should enjoy reading this, not just scanning it

## Release Steps

### 1. Determine version bump

Look at commits since last release:

- Any new feature? → MINOR bump
- Only fixes? → PATCH bump
- Breaking change? → MAJOR bump

### 2. Update package.json

```bash
# Read current version
cat package.json | grep '"version"'

# Edit version (manually or via script)
# e.g., 0.1.0 → 0.2.0
```

### 3. Update CHANGELOG.md

Add new section at TOP of changelog, below the header.
Follow the format above. Include a release nickname.

### 4. Commit the release

```bash
git add package.json CHANGELOG.md
git commit -m "🚀 release: v0.2.0 — First Words"
```

### 5. Create PR

PR title format: `🚀 Release vX.Y.Z — "Nickname"`
PR body: copy the changelog section for this version.
Always add `--reviewer zurek11`.

### 6. After merge (Adam does this)

```bash
git tag v0.2.0
git push origin v0.2.0
```

## Rules

1. Version bump happens BEFORE the final commit, not after
2. CHANGELOG.md is always updated alongside version bump
3. Every release gets a nickname
4. Release notes should be enjoyable to read
5. Never skip the changelog — even for patch releases
