# Jukebox AI

A modern web application built with Vue 3 and Node.js, combining an AI-powered music interface with a robust backend server.

## Project Structure

```
jukebox-ai/
├── client/                 # Vue 3 frontend
│   ├── index.html
│   ├── src/
│   │   ├── App.vue
│   │   ├── main.ts
│   │   ├── components/    # Reusable components
│   │   ├── views/         # Page components
│   │   ├── router/        # Vue Router configuration
│   │   ├── stores/        # Pinia state management
│   │   └── types/         # TypeScript definitions
│   ├── public/            # Static assets
│   └── vite.config.ts     # Vite configuration
├── server/                 # Node.js backend
│   ├── server.js          # Express server
│   ├── routes/            # API routes
│   └── middleware/        # Express middleware
├── package.json           # Shared dependencies
├── Dockerfile            # Docker configuration
├── .dockerignore        # Docker ignore file
└── tsconfig.json         # TypeScript configuration
```

## Prerequisites

- Node.js 18.x or later
- npm 8.x or later
- Docker (optional)

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jukebox-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file with your settings:
   ```
   PORT=3000
   API_URL=http://your-backend-api-url
   ```

## Development

Run both the frontend and backend in development mode:
```bash
npm run dev
```

This will start:
- Vue dev server at http://localhost:5173
- Node.js backend at http://localhost:3000

To run only the frontend or backend:
```bash
# Frontend only
npm run dev:client

# Backend only
npm run dev:server
```

## Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```
   This creates a production build in `dist/client/`

2. **Start the production server**
   ```bash
   npm start
   ```
   The application will be available at http://localhost:3000

## Docker Support

Build and run the application using Docker:

```bash
# Build the Docker image
docker build -t jukebox-ai .

# Run the container
docker run -p 3000:3000 --env-file .env jukebox-ai
```

Environment variables can be passed to the container:
```bash
docker run -p 3000:3000 \
  -e PORT=3000 \
  -e API_URL=http://your-backend-api-url \
  jukebox-ai
```

[Previous sections remain the same...]

## Directory Structure Details

### Client (`/client`)
- `src/components/` - Reusable Vue components
- `src/views/` - Page-level Vue components
- `src/router/` - Vue Router configuration
- `src/stores/` - Pinia state management
- `src/types/` - TypeScript type definitions

### Server (`/server`)
- `server.js` - Main Express application
- `routes/` - API route definitions
- `middleware/` - Custom Express middleware

### Root Directory
- `Dockerfile` - Docker build configuration
- `.dockerignore` - Files excluded from Docker build
- `package.json` - Project dependencies and scripts
- `tsconfig.json` - TypeScript configuration

[Rest of the README remains the same...]