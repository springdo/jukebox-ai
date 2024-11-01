# Build stage for Vue app
FROM node:18-alpine as build-frontend
WORKDIR /app
COPY package*.json ./
COPY client/ ./client/
COPY *.config.js ./
RUN npm ci
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy server file
COPY server.js .

# Copy built frontend from build stage
COPY --from=build-frontend /app/dist ./dist

# Create non-root user
USER node

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]