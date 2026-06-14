# Multi-stage build for Google Cloud Run deployment
# Stage 1: Builder
FROM node:20-slim AS builder

WORKDIR /build

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./
COPY drizzle.config.ts ./
COPY postcss.config.js ./
COPY tailwind.config.ts ./
COPY components.json ./

# Install all dependencies (including dev) for building
RUN npm ci

# Copy source code
COPY client ./client
COPY server ./server
COPY shared ./shared
COPY attached_assets ./attached_assets
COPY public ./public

# Build the application
RUN npm run build

# Stage 2: Production runner
FROM node:20-slim

WORKDIR /app

# Install dumb-init to handle signals properly
RUN apt-get update && apt-get install -y dumb-init && rm -rf /var/lib/apt/lists/*

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built application from builder
COPY --from=builder /build/dist ./dist
COPY --from=builder /build/dist/public ./dist/public

# Use the built-in node user for security (already exists in node:20-slim)
RUN chown -R node:node /app
USER node

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=8080
ENV DISABLE_REUSE_PORT=true

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:8080/', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Use dumb-init to handle signals and avoid zombie processes
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "dist/index.js"]
