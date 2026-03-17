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
