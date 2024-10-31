// serverA.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({ message: "Response from Service A" });
});

app.listen(3001, () => {
    console.log('Server A is running on port 3001');
});

