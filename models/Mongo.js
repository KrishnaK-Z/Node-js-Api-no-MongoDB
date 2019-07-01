const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    start: Number,
    end: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Companies', postSchema);