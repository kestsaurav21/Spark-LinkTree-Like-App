const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password!' });
        }
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Invalid Credentials!' });
        }

        const isPassswordMatching = await bcrypt.compare(password, user.password);
        if (!isPassswordMatching) {
            return res.status(401).json({ message: 'Invalid Credentials!' });
        }

        //Generate JWT Token
        const token = jwt.sign(
            {   id: user._id, email: user.email, username: user.username    },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        )


        return res.status(200).json({ message: 'Login Successful!', user,  token });
        

    } catch (error) {
        
        return res.status(500).json({ message: 'Error logging in user!', error: error.message });
    }
}


exports.getUser = async (req, res) => {
    try {
        const user = await User.findById({ _id : req.user.id });
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        return res.status(200).json({ message: 'User found!', user });
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.updateUser = async (req, res) => {
    const user = await User.findById({ _id: req.user.id });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    try {
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        //encrypt password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({ message: "User updated successfully" });

    }catch (error) {
        return res.status(500).json({ message: "Error updating user" });
    }
}




