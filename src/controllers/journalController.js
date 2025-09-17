const Journal = require('../models/Journal');

// Create a new journal entry
const createJournalEntry = async (req, res) => {
    try {
        // retrieve entry content from request body
        const { entry } = req.body;
        // retrieve user ID from authenticated user 
        const userId = req.user.id; 
        // validate entry content
        if (!entry) {
            return res.status(400).json({ message: 'Entry content is required' });
        }
        // create and save new journal entry
        const newEntry = new Journal({
            user: userId,
            entry
        });
        // save the entry to the database
        await newEntry.save();
        // respond with success message
        res.status(201).json({
             message: 'Journal entry saved',
             entryId: newEntry._id
            });
    } catch (error) {
        // handle errors
        console.error('Error creating journal entry:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Retrieve all journal entries for the authenticated user
const getJournalEntries = async (req, res) => {
    try {
        // retrieve user ID from authenticated user
        const userId = req.user.id;
        // fetch journal entries from the database
        // sort entries by creation date in descending order
        const entries = await Journal.find({ user: userId }).sort({ createdAt: -1 });
        // format the response to include only id, date, and createdAt
        const response = entries.map(entry => ({
         entryId: entry._id,
        date: entry.createdAt.toISOString().split('T')[0], // YYYY-MM-DD
        entry: entry.entry
}));
        res.status(200).json(response); 
    } catch (error) {
        // handle errors
        console.error('Error fetching journal entries:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a journal entry by ID 

const deleteJournalEntry = async (req, res) => {
    try {
        const entryId = req.params.id;
        const userId = req.user.id;
        // find the journal entry by ID and user ID to ensure ownership
        const entry = await Journal.findOne({ _id: entryId, user: userId });
        if (!entry) {
            return res.status(404).json({ message: 'Journal entry not found' });
        }
        // delete the entry
        await entry.remove();
        res.status(200).json({ message: 'Journal entry deleted' });
    } catch (error) {
        console.error('Error deleting journal entry:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createJournalEntry,
    getJournalEntries,
    deleteJournalEntry
};