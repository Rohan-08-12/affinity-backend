const express = require('express');
const { createJournalEntry, getJournalEntries , deleteJournalEntry} = require('../controllers/journalController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Route to create a new journal entry
router.post('/', authMiddleware, createJournalEntry);

// Route to get all journal entries for the authenticated user
router.get('/', authMiddleware, getJournalEntries);

// Route to delete a journal entry by ID
router.delete('/:id', authMiddleware, deleteJournalEntry);

module.exports = router;
