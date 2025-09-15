const mongoose = require('mongoose');

// define the chat session schema
const Schema = mongoose.Schema;

// chat schema
const chatSessionSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    messages:[{
        role:{
            type:String,
            enum:['user','ai'],
            required:true
        },
        content:{
            type:String,
            required:true,
            trim:true
        }
    }]
},{
    timestamps:true
});

// export the ChatSession model
module.exports=mongoose.model('ChatSession',chatSessionSchema);