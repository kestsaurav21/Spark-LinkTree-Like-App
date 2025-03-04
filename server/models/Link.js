const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Enum defining allowed types for links and shops
const typeEnum = ["IN", "FB", "YT", "TW", "OT"]; // Social platforms
const categoryEnum = ["LINK", "SHOP"];

const LinkSchema = new Schema({
  userId: {
    ref: "User", // References the Account model to associate entries with users
    type: Schema.Types.ObjectId,
    required: true, // Ensures each entry belongs to a user
  },
  type: {
    type: String,
    enum: typeEnum,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  clickCount: {
    default: 0,
    type: Number,
  },
  category: {
    type: String,
    enum: categoryEnum
  },
  isPublic: {
    default: false,
    type: Boolean,
  },
});

module.exports = mongoose.model("Link", LinkSchema);