const express = require('express');
const axios = require('axios');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// API to receive data from Python server
app.post('/api/from-python', (req, res) => {
    console.log('Received data from Python server:', req.body);
    res.json({ message: 'Data received on Node.js server from Python', data: req.body });
});

// API to send data to Python server
app.get('/api/send-to-python', async (req, res) => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/api/from-node', {
            message: 'Hello from Node.js server!',
            timestamp: new Date(),
        });
        res.json({ message: 'Data sent to Python server', response: response.data });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to send data to Python server' });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Node.js server is running on port ${PORT}`);
});
