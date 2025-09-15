const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JournalSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    entry: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Journal', JournalSchema);