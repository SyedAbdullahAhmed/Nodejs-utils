const express = require('express');
const app = express();

let requestQueue = [];
let isProcessing = false;

// Middleware to parse JSON
app.use(express.json());

// Function to process the next request in the queue
const processQueue = () => {
    if (requestQueue.length === 0) {
        isProcessing = false;
        return;
    }

    // Set processing flag to true
    isProcessing = true;

    const { req, res } = requestQueue.shift(); // Get the first request in the queue

    console.log(`Processing job with data:`, req.body);
    console.log(`Queue size before processing: ${requestQueue.length}`);

    // Simulate a delay of 10 seconds before sending a response
    setTimeout(() => {
        res.json({ message: 'Processed after 10 seconds', data: req.body });

        console.log(`Finished processing job with data:`, req.body);
        console.log(`Queue size after processing: ${requestQueue.length}`);

        // Process the next request after the delay
        processQueue();
    }, 10000);
};

// Endpoint to handle incoming requests
app.post('/api/queue', (req, res) => {
    // Add the request to the queue
    requestQueue.push({ req, res });

    // Log the queue when a new request is added
    console.log('New request added to the queue:', req.body);
    console.log(`Queue size: ${requestQueue.length}`);

    // If not already processing, start processing the queue
    if (!isProcessing) {
        processQueue();
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
