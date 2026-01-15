# Multi-stage build for MiniCinema
FROM node:18-alpine AS base

# Install security updates and required packages
RUN apk update && apk upgrade && \
    apk add --no-cache \
    dumb-init \
    curl \
    && rm -rf /var/cache/apk/*

# Set working directory
WORKDIR /app

# Create non-root user early
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 --ingroup nodejs minicinema

# Install dependencies only when needed
FROM base AS deps

# Copy package files with proper ownership
COPY --chown=minicinema:nodejs package*.json ./

# Install all dependencies for building
RUN npm ci --include=dev && npm cache clean --force

# Build stage
FROM base AS builder

# Copy package files
COPY --chown=minicinema:nodejs package*.json ./

# Copy node_modules from deps stage
COPY --from=deps --chown=minicinema:nodejs /app/node_modules ./node_modules

# Copy source code
COPY --chown=minicinema:nodejs . .

# Install client dependencies
WORKDIR /app/client
COPY --chown=minicinema:nodejs client/package*.json ./
RUN npm ci && npm cache clean --force

# Copy client source
COPY --chown=minicinema:nodejs client/ ./

# Build client
RUN npm run build

# Back to app root and build server
WORKDIR /app
RUN npm run build

# Remove dev dependencies and reinstall only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Development stage
FROM base AS development

# Copy package files
COPY --chown=minicinema:nodejs package*.json ./

# Copy node_modules from deps stage (includes dev dependencies)
COPY --from=deps --chown=minicinema:nodejs /app/node_modules ./node_modules

# Copy source code
COPY --chown=minicinema:nodejs . .

# Create necessary directories with proper permissions
RUN mkdir -p /app/uploads /app/logs /app/temp && \
    chown -R minicinema:nodejs /app

# Set environment variables for development
ENV NODE_ENV=development \
    PORT=5000 \
    NODE_OPTIONS="--max-old-space-size=1024"

# Create volume mount points
VOLUME ["/app/uploads", "/app/logs"]

# Expose port
EXPOSE 5000

# Switch to non-root user
USER minicinema

# Health check for development
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:5000/api/health || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the development server
CMD ["npm", "run", "dev"]

# Production image
FROM base AS runner

# Install curl for health checks
RUN apk add --no-cache curl

# Create necessary directories with proper permissions
RUN mkdir -p /app/uploads /app/logs /app/temp && \
    chown -R minicinema:nodejs /app

# Copy built application with proper ownership
COPY --from=builder --chown=minicinema:nodejs /app/dist ./dist
COPY --from=builder --chown=minicinema:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=minicinema:nodejs /app/package*.json ./

# Set environment variables
ENV NODE_ENV=production \
    PORT=5000 \
    NODE_OPTIONS="--max-old-space-size=1024" \
    NPM_CONFIG_LOGLEVEL=warn

# Create volume mount points
VOLUME ["/app/uploads", "/app/logs"]

# Expose port
EXPOSE 5000

# Switch to non-root user
USER minicinema

# Health check with better configuration
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:5000/api/health || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "dist/index.js"]
