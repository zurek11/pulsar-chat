---
name: docker
description: 'REQUIRED when modifying the Dockerfile or container setup. Invoke this skill before editing Docker-related files.'
allowed-tools: Read, Write, Edit, Bash(docker:*), Bash(bun:*)
---

# Docker Patterns

## When to Use

- Creating or updating Dockerfile
- Troubleshooting container build/run issues
- Optimizing image size

## Dockerfile — Multi-Stage Build

```dockerfile
# Stage 1: Install dependencies
FROM oven/bun:1 AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Stage 2: Build
FROM oven/bun:1 AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

# Stage 3: Production
FROM oven/bun:1-slim AS production
WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/package.json .
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["bun", "./build"]
```

## .dockerignore

```
node_modules
.svelte-kit
build
.env
.env.*
.git
.gitignore
.claudeignore
.claude
tests
playwright-report
test-results
*.md
```

## Rules

1. Always use multi-stage builds — keep production image slim
2. Use `oven/bun:1-slim` for production stage
3. Copy `bun.lock` for deterministic installs
4. Use `--frozen-lockfile` in CI/Docker to catch lockfile drift
5. Never include `.env` or secrets in Docker image
6. `.dockerignore` must exclude tests, .claude, .git
7. Expose port 3000 for the SvelteKit production server
