const express = require("express")
const router = express.Router()
const basketController = require("../controllers/basketController")
const verifyJWT = require("../middleware/verifyJWT")

router.use(verifyJWT)

router.get("/", basketController.getUserBasketById)
router.post("/", basketController.addProductToBasket)
router.delete("/", basketController.deleteProduct)

module.exports = router