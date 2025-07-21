<<<<<<< HEAD
# Multi-stage build for Movie Ticket Booking Application
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
    adduser --system --uid 1001 --ingroup nodejs movieapp

# Install dependencies only when needed
FROM base AS deps

# Copy package files with proper ownership
COPY --chown=movieapp:nodejs package*.json ./

# Install all dependencies for building
RUN npm ci --include=dev && npm cache clean --force

# Build stage
FROM base AS builder

# Copy package files
COPY --chown=movieapp:nodejs package*.json ./

# Copy node_modules from deps stage
COPY --from=deps --chown=movieapp:nodejs /app/node_modules ./node_modules

# Copy source code
COPY --chown=movieapp:nodejs . .
=======
# Multi-stage build for NaCinema
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Build the application
FROM base AS builder
WORKDIR /app

# Copy source code
COPY . .
COPY --from=deps /app/node_modules ./node_modules
>>>>>>> bd97d2dcd87743cb25cac9522dd215e630b37313

# Build the application
RUN npm run build

<<<<<<< HEAD
# Remove dev dependencies and reinstall only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Development stage
FROM base AS development

# Copy package files
COPY --chown=movieapp:nodejs package*.json ./

# Copy node_modules from deps stage (includes dev dependencies)
COPY --from=deps --chown=movieapp:nodejs /app/node_modules ./node_modules

# Copy source code
COPY --chown=movieapp:nodejs . .

# Create necessary directories with proper permissions
RUN mkdir -p /app/uploads /app/logs /app/temp && \
    chown -R movieapp:nodejs /app

# Set environment variables for development
ENV NODE_ENV=development \
    PORT=5000 \
    NODE_OPTIONS="--max-old-space-size=1024"

# Create volume mount points
VOLUME ["/app/uploads", "/app/logs"]

# Expose port
EXPOSE 5000

# Switch to non-root user
USER movieapp

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
    chown -R movieapp:nodejs /app

# Copy built application with proper ownership
COPY --from=builder --chown=movieapp:nodejs /app/dist ./dist
COPY --from=builder --chown=movieapp:nodejs /app/client/dist ./client/dist
COPY --from=builder --chown=movieapp:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=movieapp:nodejs /app/package*.json ./

# Set environment variables
ENV NODE_ENV=production \
    PORT=5000 \
    NODE_OPTIONS="--max-old-space-size=1024" \
    NPM_CONFIG_LOGLEVEL=warn

# Create volume mount points
VOLUME ["/app/uploads", "/app/logs"]
=======
# Production image
FROM base AS runner
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nacinema

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/client/dist ./client/dist
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Create uploads directory
RUN mkdir -p uploads && chown -R nacinema:nodejs uploads

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000
>>>>>>> bd97d2dcd87743cb25cac9522dd215e630b37313

# Expose port
EXPOSE 5000

# Switch to non-root user
<<<<<<< HEAD
USER movieapp

# Health check with better configuration
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:5000/api/movies || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]
=======
USER nacinema

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/api/health || exit 1
>>>>>>> bd97d2dcd87743cb25cac9522dd215e630b37313

# Start the application
CMD ["node", "dist/index.js"]