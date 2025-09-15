const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const journalRoutes = require('./routes/journal');
const userRoutes = require('./routes/user');
const moodRoutes = require('./routes/mood');
const notificationRoutes = require('./routes/notification');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
const connectDB = require('./config/db');
connectDB();

//  a simple route
app.get('/', (req, res) => {
    // debug
    console.log('Root route accessed');
    res.send('API is running...');
});

// Import and use auth routes

app.use('/auth', authRoutes);

// Import and use journal routes

app.use('/journal', journalRoutes);

// Import and use user routes
app.use('/users', userRoutes);

// Import and use mood routes
app.use('/mood', moodRoutes);

// Import and use notification routes
app.use('/notifications', notificationRoutes);

// Start the server
app.listen(PORT, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Test URL: http://localhost:${PORT}/`);
    }
});