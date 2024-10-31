// reverseProxy.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Proxy /service-a requests to Server A (port 3001)
app.use('/service-a', createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true
}));

// Proxy /service-b requests to Server B (port 3002)
app.use('/service-b', createProxyMiddleware({
    target: 'http://localhost:3002/b',
    changeOrigin: true
}));

// Handle non-matching routes
app.use((req, res) => {
    res.status(404).send('Service not found');
});

app.listen(3000, () => {
    console.log('Reverse Proxy is running on port 3000');
});
