const mongoose = require('mongoose');

// define the mood schema
const Schema = mongoose.Schema;

// create the mood schema

const moodSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    mood:{
        type:String,
        required:true,
        enum:['happy','sad','neutral','angry','anxious','excited','bored','confused']
    },
    note:{
        type:String,
        trim:true
    }
},{
    timestamps:true
});

// export the Mood model
module.exports=mongoose.model('Mood',moodSchema);