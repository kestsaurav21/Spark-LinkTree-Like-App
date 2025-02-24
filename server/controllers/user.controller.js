const express = require('express');
const bcrypt = require('bcrypt');
const User = require("../models/user.model");

exports.createUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        let user = await User.findOne({ email }); 

        if (user) { 
            return res.status(400).json({ message: 'Email Already Exists!' });
        }
        // Encrypt password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // Create new user
        user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,  // Fix field name
        });

        await user.save();
        return res.status(201).json({ message: 'User Created Successfully!' });
        
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: 'Error creating user!', error: error.message });
    }
};



