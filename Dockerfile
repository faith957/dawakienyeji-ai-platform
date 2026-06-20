# ====================================================================
# STAGE 1: Build Frontend and backend
# ====================================================================
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copy package configurations
COPY package*.json ./

# Install all dependencies (including devDependencies needed for build)
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Vite static assets & compile the standalone server via esbuild
RUN npm run build

# ====================================================================
# STAGE 2: Lightweight Production Runtime
# ====================================================================
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

# Set production environment flags
ENV NODE_ENV=production
ENV PORT=3000

# Copy package configurations to install production-only dependencies
COPY package*.json ./

# Install only standard production runtime dependencies
RUN npm install --only=production

# Copy compiled bundles and static assets from builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose port (Cloud Run will override the PORT env, but standard default)
EXPOSE 3000

# Start the Node.js production web server
CMD ["node", "dist/server.cjs"]
