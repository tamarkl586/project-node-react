require("dotenv").config()
const express = require("express")
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbConn")
const { default: mongoose } = require("mongoose")
const app = express()
const PORT = process.env.PORT || 3100
connectDB()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))

app.use("/api/auth", require("./routes/userRouter"))
app.use("/api/product", require("./routes/productRouter"))
app.use("/api/basket", require("./routes/basketRouter"))
app.use("/api/category", require("./routes/categoyRouter"))

mongoose.connection.once('open', () => {
    console.log('connected to mongoDB');
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    })
})

mongoose.connection.on('error', err => {
    console.log(err);
})