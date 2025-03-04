const User = require("../models/User");
const { v4: generateUUID } = require("uuid");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userName: generateUUID(),
      isUsernameAvailable: false,
    });
    await newUser.save();

    // Generate JWT for user authentication
    const token = newUser.createAuthToken();

    res.status(201).json({
      message: "User created successfully",
      token,
      isUsernameAvailable: newUser.isUsernameAvailable
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { userNameOrEmail, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: userNameOrEmail }, { userName: userNameOrEmail }],
    });
    
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if password matches
    const isPasswordCorrect = await user.validatePassword(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT for user authentication
    const token = user.createAuthToken();

    res.status(200).json({
      message: "Login successful",
      token,
      isUsernameAvailable: user.isUsernameAvailable
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
