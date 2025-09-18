
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const routes = require('./routes/index');
const errorHandler = require('./controllers/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
const connectDB = require('./config/db');
connectDB();


app.use('/', routes);

// Error handling middleware

app.use(errorHandler);

// Start the server
app.listen(PORT, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Test URL: http://localhost:${PORT}/`);
    }
});