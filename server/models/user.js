const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,   
    },
    lastName: {
        type: String,
        required: true,   
    },
    email: {
        type: String,
        required: true,   
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    bio: {
        type: String
    },
    username:{
        type: String,
        unique: true,
    }
});

module.exports = mongoose.model('User', userSchema);

