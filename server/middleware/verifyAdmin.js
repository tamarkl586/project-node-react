
const verifyAdmin = (req, res, next) => {
    if(!req.user?.roles == "Admin")
        return res.status(400).send("user unauthorized!")
    next()
}

module.exports = verifyAdmin