// server.js
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const API_URL = process.env.API_URL || 'http://localhost:8080';

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'dist')));

// Custom logging middleware
app.use((req, res, next) => {
    const startTime = new Date();
    const body = req.body ? JSON.stringify(req.body) : '';
    
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}${body ? ` Body: ${body}` : ''}`);
    
    res.on('finish', () => {
        const duration = new Date() - startTime;
        console.log(`[${new Date().toISOString()}] Completed ${res.statusCode} (${duration}ms)`);
    });
    next();
});

const apiProxy = createProxyMiddleware({
    target: API_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api': '',
    },
    logLevel: 'debug',
    onProxyReq: (proxyReq, req, res) => {
        // Log the request info
        console.log(`[Proxy] ${req.method} ${req.originalUrl} -> ${API_URL}${proxyReq.path}`);
        
        // Handle POST requests with body
        if (req.method === 'POST' && req.body) {
            const bodyData = JSON.stringify(req.body);
            console.log(`[Proxy] Request Body:`, bodyData);
            
            // Update headers
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            
            // Write body to request
            proxyReq.write(bodyData);
        }
    }
});

app.use('/api', apiProxy);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});