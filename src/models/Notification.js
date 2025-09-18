const mongoose = require('mongoose');

// define the mood schema
const Schema = mongoose.Schema;

// create the notification schema

const notificationSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    message:{
        type:String,
        required:true,
        trim:true
    },
    read:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});