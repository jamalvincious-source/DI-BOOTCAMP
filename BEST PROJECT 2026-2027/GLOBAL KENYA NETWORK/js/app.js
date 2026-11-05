```javascript
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Homepage API
app.get("/api", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to Global Network Kenya API"
    });
});

// Health check
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        server: "Running"
    });
});

// Example business endpoint
app.get("/api/businesses", (req, res) => {
    res.json({
        success: true,
        businesses: []
    });
});

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API route not found"
    });
});

module.exports = app;
```