const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoryEnum = [
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

const themeStyleEnum = ["AIR_SNOW", "AIR_GREY", "AIR_SMOKE", "AIR_BLACK", "MINERAL_BLUE", "MINERAL_GREEN", "MINERAL_ORANGE"];


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
        required: true
    },
    terms : {
        type: Boolean,
    },
    username : {
        type: String,
        unique: true,
        sparse: true,
        default: null,
    },
    category: { type: String, enum: categoryEnum, default: "BU" },
    image : {
        type: String,
    },
    bio : {
        type: String,
    },

    userTheme: {
        type: Object,
        default: {
          bannerColor: "#000000",
          layoutType: "STACK",
          button: {
            fill: "standard",
            outline: "standard",
            hardShadow: "standard",
            softShadow: "standard",
            special: "standard",
            color: "#FFFFFF",
            fontColor: "#888888",
          },
        },
    },
    fontInfo: {
        fontType: {
           type: String, default: "Sans"},
        color: {
            type: String, default: "#000000"
        },
    },
    themeStyle: {
        type: String,
        enum: themeStyleEnum,
        default: "AIR_SNOW"
    },  
});

module.exports = mongoose.model('User', userSchema);

