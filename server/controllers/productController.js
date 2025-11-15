const Product = require("../models/Product")
const Category = require("../models/Category")

const getAllProducts = async (req, res) => {
    const products = await Product.find().lean()
    res.json(products)
}

const getProductById = async (req, res) => {
    console.log("aaa");
    const { id } = req.params
    const product = await Product.findById(id)//.lean()
    if (!product)
        return res.status(400).send("product not found!")
    console.log(product);
    res.json(product)
}

const addProduct = async (req, res) => {
    const { name, description, price, img, quantity, category } = req.body
    if (!name || !description || !price || !img || !quantity)
        res.status(400).send("all fields are required!")
    const findProduct = await Product.findOne({ name }).lean()
    if (findProduct)
        return res.status(400).send("product name allready exist")
    if (category) {
        const findCategory = await Category.findOne({ name: category })
        if (!findCategory)
            return res.status(400).send("category not found!")
    }
    const product = await Product.create({ name, description, price, img, quantity, category })
    res.json(product)
}

const updateProduct = async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    if (!product)
        return res.status(400).send("product not found!")
    const { name, description, price, img, quantity, category } = req.body

    if (name) {
        const findProduct = await Product.findOne({ name }).lean()
        if (findProduct)
            return res.status(400).send("product name allready exist")
        product.name = name
    }
    if (description)
        product.description = description
    if (price)
        product.price = price
    if (img)
        product.img = img
    if (quantity )
        product.quantity = quantity
    if (category) {
        const findCategory = await Category.findOne({ name: category })
        if (!findCategory)
            return res.status(400).send("category not found!")
        product.category = category
    }

    const updatedProduct = await product.save()
    res.json({message: `${updatedProduct.name} - update`})
}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    const product = await Product.findById({_id: id}).exec()
    if (!product)
        return res.status(400).send("product not found!")
    await product.deleteOne()
    res.send("product deleted!")
}

module.exports = { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct }