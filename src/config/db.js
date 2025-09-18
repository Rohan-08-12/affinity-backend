// import mongoose
const mongoose = require('mongoose');
// load environment variables
const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/affinity';

// function to connect to MongoDB
const connectDB = async () => {
    try {
        // connect to the database
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connected');
    } catch (error) {
        // log any errors
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// export the connectDB function
module.exports = connectDB;