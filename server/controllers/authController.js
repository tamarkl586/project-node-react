const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password)
        return res.status(400).send("username and password are required!")
    const user = await User.findOne({ username }).lean()
    if (!user)
        return res.status(401).send("user are unauthorized")
    const match = await bcrypt.compare(password, user.password)
    if (!match)
        return res.status(401).send("user are unauthorized")
    const userInfo = {
        id: user._id,
        name: user.name,
        city: user.city,
        phone: user.phone,
        email: user.email,
        username: user.username,
        roles: user.roles
    }
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken })
}

const register = async (req, res) => {
    const { name, city, phone, email, username, password } = req.body
    if (!name || !city || !phone || !email || !username || !password)
        return res.status(400).send("all fields  are required!")
    const checkUser = await User.findOne({ username }).lean()
    if (checkUser)
        return res.status(409).send("username allready exist")
    const hashPass = await bcrypt.hash(password, 10)
    const user = { name, city, phone, email, username, password: hashPass }
    const createUser = await User.create(user)
    if (createUser)
        return res.status(201).json({message: `new user created - ${user.username}`})
    else {
        return res.status(400).send("create user failed")
    }
}

module.exports = { login, register }