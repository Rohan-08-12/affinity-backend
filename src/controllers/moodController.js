const Mood = require('../models/Mood');

const logMood = async(req,res)=>{
    try {
        const {mood,note}=req.body;
        const newMood=new Mood({
            user:req.user._id,
            mood,
            note
        });
        await newMood.save();
        res.status(201).json({message:'Mood logged successfully',moodId:newMood._id});
    } catch (error) {
        console.log('Error logging mood:',error);
        res.status(500).json({message:'Server error'});
    }
}

const getMoodHistory=async(req,res)=>{
    try {
        const moods=await Mood.find({user:req.user._id}).sort({createdAt:-1});
        const response=moods.map(mood=>({
            date:mood.createdAt.toISOString().split('T')[0], // format date as YYYY-MM-DD
            mood:mood.mood
        }));
        res.status(200).json(response);
    } catch (error) {
        console.log('Error fetching mood history:',error);
        res.status(500).json({message:'Server error'});
    }
}

module.exports={logMood,getMoodHistory};