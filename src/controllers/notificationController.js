const Notification = require('../models/Notification');

const getNotifications=async(req,res)=>{
    try {
        const notifications=await Notification.find({user:req.user._id}).sort({createdAt:-1});
        const response=notifications.map(notification=>({
            id:notification._id,
            message:notification.message,
            read:notification.read
        }));
        res.status(200).json(response);
    } catch (error) {
        console.log('Error fetching notifications:',error);
        res.status(500).json({message:'Server error'});
    }
}

const markNotificationAsRead=async(req,res)=>{
    try {
        const notification=await Notification.findOneAndUpdate(
            {_id:req.params.id,user:req.user._id},
            {read:true},
            {new:true}
        );
        if(!notification){
            return res.status(404).json({message:'Notification not found'});
        }
        res.status(200).json({message:'Notification marked as read'});
    } catch (error) {
        console.log('Error marking notification as read:',error);
        res.status(500).json({message:'Server error'});
    }
}

module.exports={getNotifications,markNotificationAsRead};