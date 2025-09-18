const User=require('../models/User');

// get user profile controller
const getUserProfile=async(req,res)=>{
    try{
        // fetch user by ID from request object, exclude password field
        const user=await User.findById(req.user._id).select('-password');
        // if user not found, return error
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        // return user profile
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            preferences: user.preferences || {}
        });
        // handle errors
    }catch(error){
        console.log('Error fetching user profile:',error);
        res.status(500).json({message:'Server error'});
    }
}

// update user profile controller
const updateUserProfile=async(req,res)=>{
    try {
        // update user preferences
        const {preferences}=req.body;
        // find user by ID and update preferences, return updated user excluding password
        const user=await User.findByIdAndUpdate(
            req.user._id,
            {preferences},
            {new:true,runValidators:true}
        ).select('-password');

        // if user not found, return errorx
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        res.status(200).json({
            id:user._id,
            name:user.name,
            email:user.email,
            preferences:user.preferences
    });
    } catch (error) {
       console.log('Error updating user profile:',error);
         res.status(500).json({message:'Server error'});
    }
}


// Update user preferences controller
const updatePreferences=async(req,res)=>{
    try{
        const {preferences}=req.body;
        // find user by ID and update preferences, return updated user excluding password
        const user=await User.findByIdAndUpdate(
            req.user._id,
            {preferences},
            {new:true,runValidators:true}
        ).select('-password');
        // if user not found, return error
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        res.status(200).json({
            message: 'Preferences updated',
            preferences: user.preferences
        });
    }catch(error){
        console.log('Error updating preferences:',error);
        res.status(500).json({message:'Server error'});
    }
}

module.exports={getUserProfile,updateUserProfile, updatePreferences};