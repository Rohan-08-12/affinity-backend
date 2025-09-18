const express = require('express');
const router = express.Router();
const { getNotifications,markNotificationAsRead} = require('../controllers/notificationController');
const authMiddleware = require('../middlewares/authMiddleware');



// get all notifications for a user
// GET /notification
router.get('/', authMiddleware, getNotifications);

// mark a notification as read
// PUT /notification/:id/read
router.put('/:id/read', authMiddleware, markNotificationAsRead);

module.exports = router;