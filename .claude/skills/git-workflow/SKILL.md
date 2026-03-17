---
name: git-workflow
description: Git operations including branching, committing, and PR workflows. Use when committing changes, creating branches, or managing version control.
allowed-tools: Bash(git:*), Read, Grep
---

# Git Workflow

## When to Use
- Committing changes
- Creating feature branches
- Preparing code for push

## Branch Naming
```
feat/[short-description]    # New feature
fix/[short-description]     # Bug fix
refactor/[short-description] # Code refactoring
test/[short-description]    # Adding tests
docs/[short-description]    # Documentation
```

## Commit Messages
Follow Conventional Commits:
```
feat: add message streaming component
fix: resolve input focus loss on re-render
refactor: extract chat state into rune module
test: add unit tests for ChatInput
docs: update README with setup instructions
chore: update dependencies
```

## Pre-Commit Checklist
1. `bun run check` — TypeScript/Svelte type checking passes
2. `bun run lint` — no linting errors
3. `bun test:unit` — unit tests pass
4. No `.env` files or secrets in staged changes
5. No `console.log` left in production code (use `$inspect()` in dev only)

## Rules
1. Never commit directly to `main` — always use feature branches
2. Keep commits atomic — one logical change per commit
3. Public repo: double-check no secrets, tokens, or personal data in diff
4. Run pre-commit checklist before every push
