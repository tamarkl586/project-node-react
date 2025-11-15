const mongoose = require("mongoose")
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true 
        },
        roles: {
            type: String,
            enum: ["User", "Admin"],
            default: "User"
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true 
        },
        password: {
            type: String,
            required: true,
            // minLength: 4,
            // maxLenght: 13
        }
    },
    {
        timestamps: true
    })

module.exports = mongoose.model("User", userSchema)