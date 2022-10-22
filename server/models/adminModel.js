const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            min: 5,
            max: 20,
            unique: true,             
        },
        email: {
            type: String,
            required: true,
            min: 8,
            max: 40,
            unique: true,             
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 20,
        },
        
    },
    { timestamps: true }
);

module.exports = mongoose.model("Admin", AdminSchema);