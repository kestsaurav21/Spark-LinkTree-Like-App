const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: generateUUID } = require("uuid");
dotenv.config();

const categoryOptions = [
  "BU", // Business
  "CR", // Creative
  "ED", // Education
  "EN", // Entertainment
  "FA", // Fashion & Beauty
  "FO", // Food & Beverage
  "GO", // Government & Politics
  "HE", // Health & Wellness
  "NP", // Non-Profit
  "TE", // Tech
  "OT", // Other
  "TR", // Travel & Tourism
];

const themeVariants = ["AIR_SNOW", "AIR_GREY", "AIR_SMOKE", "AIR_BLACK", "MINERAL_BLUE", "MINERAL_GREEN", "MINERAL_ORANGE", "NONE"];

const userSchema = new Schema({
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
    required: true,
  },
  userName: { type: String, unique: true, sparse: true, default: generateUUID },
  isUsernameAvailable: { type: Boolean, default: false },
  profilePicture: { type: String },
  biography: { type: String },
  appearanceSettings: {
    type: Object,
    default: {
      bannerColor: "#000000",
      layoutType: "STACK",
      button: {
        fill: "",
        outline: "",
        hardShadow: "",
        softShadow: "",
        special: "",
        backgroundColor: "#28A263",
        color: "#FFFFFF"
      },
    },
  },
  category: {
    type: String,
    enum: categoryOptions,
    default: "BU",
  },
  typography: {
    fontFamily: {
      type: String, default: "Poppins"
    }
  },
  themeVariant: {
    type: String,
    enum: themeVariants,
    default: "AIR_SNOW"
  },
});

// Generate JWT for user authentication
userSchema.methods.createAuthToken = function () {
  const payload = {
    userId: this._id
  };

  const options = {
    expiresIn: process.env.JWT_EXPIRES_IN,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

// Compare provided password with stored hash
userSchema.methods.validatePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);