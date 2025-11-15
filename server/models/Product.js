const mongoose = require("mongoose")
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true, 
        },
        price: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.String,
            required: true,
            ref: "Category"
        }
    },
    {
        timestamps: true
    })

module.exports = mongoose.model("Product", productSchema)