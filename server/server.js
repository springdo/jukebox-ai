// server/server.js (moved from src/server.js)
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const API_URL = process.env.API_URL || 'http://localhost:8080';

// Setup request logging to stdout
app.use(morgan('dev'));

// Serve the static files from the Vue app build directory
app.use(express.static(path.join(__dirname, '../dist/client')));

// Custom logging middleware for API requests
app.use((req, res, next) => {
    const startTime = new Date();
    res.on('finish', () => {
        const duration = new Date() - startTime;
        console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`);
    });
    next();
});

// Proxy middleware configuration
const apiProxy = createProxyMiddleware({
    target: API_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api': '',
    },
    logLevel: 'debug',
    onProxyReq: (proxyReq, req, res) => {
        console.log(`[Proxy] ${req.method} ${req.originalUrl} -> ${API_URL}${proxyReq.path}`);
    }
});

// Use proxy middleware for /api routes
app.use('/api', apiProxy);

// Handle SPA routing by serving index.html for non-api routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/client/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});