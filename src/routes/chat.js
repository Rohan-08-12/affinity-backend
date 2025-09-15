const express = require('express');
const router = express.Router();
const { startSession, getSessionHistory } = require('../controllers/chatController');
const authMiddleware = require('../middlewares/authMiddleware');

// Start a new chat session
// POST /chat/session
router.post('/session', authMiddleware, startSession);

// Get chat session history
// GET /chat/session/:id
router.get('/session/:id', authMiddleware, getSessionHistory);

module.exports = router;