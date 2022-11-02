const mongoose = require("mongoose");

const UserSchema =  new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min_characters: 3,
        max_characters: 16,
        unique: true,
    },
    email_address: {
        type: String,
        require: true,
        max_characters: 50,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        min_characters: 6,
        max_characters: 24
    },
    role: {
        type: String,
        require: true,
        min_characters: 1,
        max_characters: 24
    }

}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);