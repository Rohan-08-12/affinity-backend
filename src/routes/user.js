const express=require('express');
const router=express.Router();
const {getUserProfile,updateUserProfile}=require('../controllers/userController');
const authMiddleware=require('../middlewares/authMiddleware');

// fetch user profile
// GET /users/:id
router.get('/:id',authMiddleware,getUserProfile);

// update user profile
// PUT /users/:id
router.put('/:id',authMiddleware,updateUserProfile);

// update user preferences
// PUT /users/:id/preferences
router.put('/:id/preferences',authMiddleware,updateUserProfile);
module.exports=router;