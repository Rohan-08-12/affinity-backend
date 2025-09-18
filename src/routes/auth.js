const express = require('express');
const router = express.Router();
const { registerUser, loginUser , getMe } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const {updatePreferences} = require('../controllers/userController');

// POST /auth/register
router.post('/register', registerUser );

// POST /auth/login
router.post('/login', loginUser );

// Protected route to get user info
// GET /auth/me
router.get('/me', authMiddleware, getMe );

// preference update route
router.put('/me/preferences', authMiddleware, updatePreferences);

module.exports = router;