const express = require("express")
const router = express.Router()
const categoryController = require("../controllers/categoryController")
const verifyJWT = require("../middleware/verifyJWT")
const verifyAdmin = require("../middleware/verifyAdmin")

router.use(verifyJWT)
router.use(verifyAdmin)

router.get("/", categoryController.getAllCategoreis)
router.post("/", categoryController.addCategory)
router.put("/:id", categoryController.updateCategory)
router.delete("/:id", categoryController.deleteCategory)

module.exports = router