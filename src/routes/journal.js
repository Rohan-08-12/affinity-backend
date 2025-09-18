const express = require('express');
const { createJournalEntry, getJournalEntries } = require('../controllers/journalController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Route to create a new journal entry
router.post('/', authMiddleware, createJournalEntry);

// Route to get all journal entries for the authenticated user
router.get('/', authMiddleware, getJournalEntries);

module.exports = router;
