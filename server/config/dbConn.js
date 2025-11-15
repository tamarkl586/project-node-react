const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
        console.log("connected to DB");
    } catch (err) {
        console.log("cannot connect to mongoDB");
        
    }
}

module.exports = connectDB