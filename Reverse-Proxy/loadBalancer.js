// reverseProxy.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Array to store the target servers for load balancing
const targets = ['http://localhost:3001', 'http://localhost:3002'];

// Variable to keep track of which server to forward to (round-robin logic)
let currentTargetIndex = 0;

// Middleware to act as a load balancer
app.use('/', (req, res, next) => {
    // Select the current target based on round-robin
    const target = targets[currentTargetIndex];
    currentTargetIndex = (currentTargetIndex + 1) % targets.length;

    // Forward the request to the selected target
    createProxyMiddleware({ target, changeOrigin: true })(req, res, next);
});

// Handle unmatched routes (if necessary)
app.use((req, res) => {
    res.status(404).send('Service not found');
});

app.listen(3000, () => {
    console.log('Reverse Proxy (Load Balancer) is running on port 3000');
});
