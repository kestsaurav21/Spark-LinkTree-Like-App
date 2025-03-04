const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CTASchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  linkId: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  viewType: {
    type: String,
    required: true,
    enum: ["EXTERNAL", "INTERNAL"],
    required: true,
  },
  device: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("CTA", CTASchema);