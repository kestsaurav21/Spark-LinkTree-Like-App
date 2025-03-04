const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Enum defining allowed types for links and shops
const typeEnum = ["LINK", "SHOP"];
const linkCategoryEnum = ["IN", "FB", "YT", "TW"]; // Social platforms
const shopCategoryEnum = ["OT"]; // Default shop category

const LinkSchema = new Schema({
  ownerId: {
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
    enum: [...linkCategoryEnum, ...shopCategoryEnum]
  },
  isPublic: {
    default: false,
    type: Boolean,
  },
});

module.exports = mongoose.model("Link", LinkSchema);