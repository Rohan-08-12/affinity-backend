const jwt=require('jsonwebtoken');
const User=require('../models/User');


// middleware to protect routes

const authMiddleware=async(req,res,next)=>{
    // get token from header
    // ?. safely accesses properties/methods even if the left side is null or undefined
// If req.header('Authorization') returns null or undefined, the whole expression becomes undefined instead of throwing an error
    const token=req.header('Authorization')?.replace('Bearer ','');
    if(!token){
        return res.status(401).json({message:'No token, authorization denied'});
    }

    try{
        // verify the token
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        // find user by id from token
        // This finds the user by ID but excludes the password field from the returned data.
        const user=await User.findById(decoded.userId).select('-password');
        if(!user){
            return res.status(401).json({message:'User not found, authorization denied'});
        }
        // attach user to request object
        req.user=user;
        next();
    }catch(error){
        console.error('Auth middleware error:',error);
        // Specific error handling for JWT errors
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token, authorization denied' });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired, authorization denied' });
        } else {
            res.status(500).json({ message: 'Server error' });
    }}
}

module.exports=authMiddleware;