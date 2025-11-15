const express = require("express")
const router = express.Router()
const productController = require("../controllers/productController")
const verifyJWT = require("../middleware/verifyJWT")
const verifyAdmin = require("../middleware/verifyAdmin")

router.get("/", productController.getAllProducts)
router.get("/:id", productController.getProductById)
router.use(verifyJWT)
router.use(verifyAdmin)
router.post("/", productController.addProduct)
router.put("/:id", productController.updateProduct)
router.delete("/:id", productController.deleteProduct)

module.exports = router