const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Successfully connected to the MongoDB database');
        
        
    } catch (error) {
        console.log('Error connecting to the MongoDB database:', error);
    }
}

module.exports = connectDB;