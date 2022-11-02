const mongoose = require("mongoose");

const DraftPinSchema =  new mongoose.Schema({
    _id: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true,
        min_characters: 3,
        max_characters: 32,
    },
    desc: {
        type: String,
        require: true,
        min_characters: 3,
        max_characters: 256,
    },
    lat: {
        type: Number,
        require: true
    },
    long: {
        type: Number,
        require: true
    }
}, { timestamps: true });

module.exports = mongoose.model("DraftPinRemove", DraftPinSchema);