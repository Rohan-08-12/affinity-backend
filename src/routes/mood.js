const express=require('express');
const router=express.Router();
const {logMood,getMoodHistory}=require('../controllers/moodController');
const authMiddleware=require('../middlewares/authMiddleware');

// log a new mood entry
// POST /mood
router.post('/',authMiddleware,logMood);

// get mood history
// GET /mood/history
router.get('/',authMiddleware,getMoodHistory);

module.exports=router;