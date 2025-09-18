const express = require('express');
const router = express.Router();

//  Import  routes modules
const authRoutes = require('./auth');
const userRoutes = require('./user');
const  journalRoutes = require('./journal');
const moodRoutes = require('./mood');
const chatRoutes = require('./chat');
const notificationRoutes = require('./notification');

// Use routes modules
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/journals', journalRoutes);
router.use('/moods', moodRoutes);
router.use('/chats', chatRoutes);
router.use('/notifications', notificationRoutes);

module.exports = router;