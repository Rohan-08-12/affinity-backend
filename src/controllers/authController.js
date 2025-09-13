// impport User model and jwt
const User = require('../models/User');
const jwt = require('jsonwebtoken');


// register user controller
const registerUser=async (req, res) => {
    // retrieve name, email, and password from request body
    const { name, email, password } = req.body;

    try {
        // check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            // if user exists, return error
            return res.status(400).json({ message: 'User already exists' });
        }
        // create new user
        user = new User({ name, email, password });
        // save user to database
        await user.save();

        // create and sign JWT token
        const payload = { userId: user._id };
        // token expires in 1 hour
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// login user controller
const loginUser=async(req,res)=>{
    // retrieve email and password from request body
    const {email,password}=req.body;
    
    try{
        // find user by email
        const user=await User.findOne({ email });
        if(!user){
            // if user not found, return error
            return res.status(400).json({message:'Invalid Credentials'});
        }
        // compare entered password with stored hashed password
        const isMatch=await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({message:'Invalid Credentials'});
        }
        // create and sign JWT token
        const payload={userId:user._id};
        const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1h'});
        // token expires in 1 hour
        res.json({token});
    }catch(error){
        console.error(error);
        res.status(500).json({message:'Server error'});
    }
}


// get user profile controller

const getMe=async(req,res)=>{
    try {
        // return user profile from request object
        res.status(200).json(req.user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports={registerUser,loginUser,getMe};