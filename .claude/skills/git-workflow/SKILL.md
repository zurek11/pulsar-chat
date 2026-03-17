---
name: git-workflow
description: Git operations including branching, emoji commits, and PR creation. Use when committing changes, creating branches, pushing, or opening pull requests.
allowed-tools: Read, Grep, Bash(git:*), Bash(gh:*)
---

# Git Workflow

## When to Use

- Committing any changes
- Creating feature branches
- Pushing and opening PRs
- Addressing PR review feedback

## Branch Naming

```
feat/[short-description]     # New feature
fix/[short-description]      # Bug fix
refactor/[short-description] # Code refactoring
test/[short-description]     # Adding tests
docs/[short-description]     # Documentation
chore/[short-description]    # Maintenance
docker/[short-description]   # Container changes
```

## Emoji Commit Messages

Every commit MUST start with an emoji. Keep messages fun but informative.

| Emoji | Type     | Example                                                   |
| ----- | -------- | --------------------------------------------------------- |
| 🎉    | feat     | `🎉 feat: add streaming chat input with auto-resize`      |
| 🐛    | fix      | `🐛 fix: stop message list from jumping on new message`   |
| ♻️    | refactor | `♻️ refactor: extract streaming logic into composable`    |
| 🧪    | test     | `🧪 test: cover ChatInput edge cases (empty, overflow)`   |
| 📝    | docs     | `📝 docs: add architecture diagram to README`             |
| 🔧    | chore    | `🔧 chore: bump svelte to 5.x, update lockfile`           |
| 💄    | style    | `💄 style: polish message bubbles with subtle animations` |
| 🐳    | docker   | `🐳 docker: slim down image with multi-stage build`       |
| 🚀    | release  | `🚀 release: v0.2.0 — streaming & clear history`          |
| 🗑️    | remove   | `🗑️ chore: remove unused utility functions`               |
| 🔒    | security | `🔒 fix: sanitize user input before rendering`            |
| ⚡    | perf     | `⚡ perf: debounce scroll handler in chat window`         |

### Tone Guide

- Be specific about WHAT changed, not just WHERE
- A little personality is encouraged: "🐛 fix: teach message list to stay put" > "🐛 fix: fix scroll bug"
- Keep under 72 chars

## Full PR Workflow

### 1. Create branch

```bash
git checkout main
git pull origin main
git checkout -b feat/chat-input
```

### 2. Implement + test

Write code and tests together. No code without tests.

### 3. Pre-push checklist (ALL must pass)

```bash
bun test:unit          # Unit tests pass
bun run check          # TypeScript/Svelte types pass
bun run lint           # No lint errors
bun run format --check # Formatting correct
```

### 4. Bump version + changelog

Use the `release` skill. Always bump BEFORE committing.

### 5. Commit and push

```bash
git add .
git commit -m "🎉 feat: add chat input with streaming support"
git push -u origin feat/chat-input
```

### 6. Create PR

```bash
gh pr create \
  --title "🚀 Release v0.2.0 — streaming chat input" \
  --body "$(cat <<'EOF'
## What's new in v0.2.0

🎉 **Features**
- Chat input with auto-resize and keyboard shortcuts
- Streaming response display with token-by-token rendering

🧪 **Tests**
- Unit tests for ChatInput, MessageBubble
- E2E test for send-and-receive flow

📋 **Changelog**
See CHANGELOG.md for full details.
EOF
)" \
  --reviewer zurek11
```

### 7. After review — two paths

**Path A: @claude directly on GitHub**
Adam leaves a review comment and tags `@claude` in the PR.
Claude GitHub App addresses feedback automatically — commits a fix directly to the PR branch.

**Path B: Via Claude Code locally**

```bash
# Read review feedback
gh pr view 3 --comments

# Fix what's needed, commit + push
git commit -m "🐛 fix: address PR feedback — [specific change]"
git push
```

Both approaches update the PR automatically. Adam re-reviews and merges.

## Rules

1. Never commit directly to `main` — always use feature branches + PR
2. Keep commits atomic — one logical change per commit
3. Public repo: double-check no secrets in diff before push
4. Run full pre-push checklist before every push
5. No `console.log` in production code (use `$inspect()` in dev only)
6. Always create PR with `--reviewer zurek11`
