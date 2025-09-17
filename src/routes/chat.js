const express = require('express');
const { 
  startSession, 
  continueSession, 
  getSession, 
  getSessionHistory 
} = require('../controllers/chatController');
const authMiddleware = require('../middlewares/authMiddleware'); 

const router = express.Router();

// 🆕 Start a new conversation
router.post('/start', authMiddleware, startSession);

// 🆕 Continue existing conversation
router.post('/continue', authMiddleware, continueSession);

// 🆕 Get specific conversation
router.get('/session/:sessionId', authMiddleware, getSession);

// Get all conversation history (existing)
router.get('/history', authMiddleware, getSessionHistory);

module.exports = router;