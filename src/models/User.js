// import mongoose and bcrypt
const mongoose = require('mongoose');
const bcrypt=require('bcrypt');

// define the user schema
const Schema = mongoose.Schema;

// create the user schema
const userSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    preferences:{
        reminderFrequency:{
            type:String,
            // enum -> restrict values to these options
            enum:['none','daily','weekly'],
            default:'daily'
        },
        journalPrivacy:{
            type:String,
            enum:['private','public'],
            default:'private'
        }
    }
    ,
    createdAt:{
        type:Date,
        default:Date.now
    }
},{
    timestamps:true
})

// hash the password before saving the user
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }

    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
});

// method to compare entered password with hashed password
userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

module.exports=mongoose.model('User',userSchema);

