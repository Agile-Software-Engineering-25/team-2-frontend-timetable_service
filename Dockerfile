# =================================================================
# Multi-Stage Docker Build für React/Vite Frontend
# =================================================================

# Stage 1: Build Env
FROM node:18-alpine AS builder
WORKDIR /app

# Setup pnpm & package dependencies
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./

# Shared Components Mock -> lokale Dependencies
RUN mkdir -p shared-components && \
    if [ ! -f shared-components/package.json ]; then \
        echo '{"name": "@agile-software/shared-components", "version": "1.0.0", "main": "index.js", "type": "module", "exports": {".": "./index.js", "./createCustomTheme": "./createCustomTheme.js"}}' > shared-components/package.json && \
        echo 'export const createCustomTheme = (config) => config;' > shared-components/createCustomTheme.js && \
        echo 'export const createCustomTheme = (config) => config;' > shared-components/index.js; \
    fi

COPY shared-components ./shared-components
RUN pnpm install --prefer-offline

# Build Application
COPY . .
RUN pnpm run build

# Production Env
FROM nginx:alpine AS production

# Setup Static Files und nginx Config
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf.template
COPY docker-entrypoint.sh /docker-entrypoint.sh

# Runtime Env Setup
RUN chmod +x /docker-entrypoint.sh && \
    apk add --no-cache gettext && \
    addgroup -g 1001 -S appuser && \
    adduser -S appuser -u 1001 -G appuser

# Env Variablen und Container Config
ENV PORT=80
ENV API_URL=http://host.docker.internal:3000/api/
EXPOSE $PORT

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:$PORT/health || exit 1

ENTRYPOINT ["/docker-entrypoint.sh"]