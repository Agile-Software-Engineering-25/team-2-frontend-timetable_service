# Stage 1: Dependencies Installation
FROM node:20-alpine AS deps
WORKDIR /app

# Package Manager Setup für bessere Performance
RUN apk add --no-cache libc6-compat && \
    npm config set fund false && \
    npm config set audit false

# Dependencies installieren (separates Layer für besseres Caching)
COPY package*.json ./
RUN npm install --omit=dev --no-optional && \
    npm cache clean --force

# Stage 2: Production Runtime
FROM node:20-alpine AS runner
WORKDIR /app

# Security: Non-root User erstellen
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs

# Optimierte Dependencies von deps stage
COPY --from=deps --chown=nodejs:nodejs /app/node_modules ./node_modules

# Application Code
COPY --chown=nodejs:nodejs . .

# Env Variables mit sinnvollen Defaults
ENV NODE_ENV=production
ENV PORT=3000
ENV DATABASE_URL=mongodb://localhost:27017/timetable
ENV LOG_LEVEL=info

# Security und Performance
USER nodejs
EXPOSE $PORT

# Health Check für Container Monitoring
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node healthcheck.js || exit 1

# Graceful Shutdown Support
STOPSIGNAL SIGTERM

# Application starten
CMD ["node", "server.js"]
