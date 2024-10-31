

// serverB.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({ message: "Response from Service B" });
});

app.listen(3002, () => {
    console.log('Server B is running on port 3002');
});
