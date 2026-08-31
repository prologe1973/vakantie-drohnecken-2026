# Stage 1: Base image with dependencies
FROM node:20-alpine AS base

# Install libc6-compat + libstdc++/libgcc voor better-sqlite3 (native) op alpine
RUN apk add --no-cache libc6-compat libstdc++ libgcc
WORKDIR /app

# Stage 2: Install all dependencies
FROM base AS deps
# Build-tools nodig om better-sqlite3 (native module) te compileren op alpine
RUN apk add --no-cache python3 make g++
COPY package.json package-lock.json* ./
RUN npm ci

# Stage 3: Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js telemetry uitschakelen tijdens build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# Stage 4: Production runner image (minimalist standalone runtime)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Beveiliging: non-root user aanmaken
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Map voor de persistente SQLite-database (gemount als volume)
RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data

# Kopieer alleen de benodigde standalone artifacts en public assets
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Databasepad instellen
ENV DB_PATH=/app/data/journal.json

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
