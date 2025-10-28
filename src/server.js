
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const routes = require('./routes/index');
const errorHandler = require('./controllers/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Middleware to parse JSON requests
app.use(express.json());

// Initialize Groq (for chat)
const groq = require('./config/groq');

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