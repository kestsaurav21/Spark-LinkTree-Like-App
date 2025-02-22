const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const applicationEnum = ["IN", "FB", "YT", "TW"];

const linkSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    linkTitle: {
        type: String,
        required: true,
    },
    linkUrl: {
        type: String,
        required: true,
    },
    linkClicks: {
        default: 0,
        type: Number,
    },
    linkType: {
        type: String,
        enum: applicationEnum,
        default: "IN",
    }, 
    show: {
        default: false,
        type: Boolean,
    }

});


module.exports = mongoose.model('Link', linkSchema);