const Basket = require("../models/Basket")
const Product = require("../models/Product")

//Get Basket
const getUserBasketById = async (req, res) => {
    try {
        const userBasket = await Basket.findOne({ userId: req.user.id })
            .populate({ path: "products", model: "Product", });

        if (!userBasket || userBasket.products.length === 0) {
            return res.json([])
        }

        res.json(userBasket.products);
    }
    catch (error) {
        console.error("Error fetching basket:", error);
        res.status(500).send("Server error");
    }
}

//Add/Update Product To Basket
const addProductToBasket = async (req, res) => {
    const { productId, quentity = 1 } = req.body

    if (!productId)
        return res.status(400).send("all fileds are required")

    const findProduct = await Product.findById({ _id: productId })
    if (!findProduct)
        return res.status(400).send("product not exist!!!")

    const basket = await Basket.findOne({ userId: req.user.id })
    if (basket) {
        let arr = []
        const products = basket.products
        const existProducts = basket.products.find((p) => p.productId == productId)
        if (!existProducts && quentity > 0) {
            products.push({ productId, quentity })
        }

        else {
            let q
            products.map(product => {
                if (product.productId == productId) {
                    product.quentity += quentity
                    q = product.quentity
                }
                return product
            })
        }
        basket.products = products//arr.length == 0 ? products : arr
        const updateBasket = await basket.save()
        return res.json({ message: "The product addad succsefuly", updateBasket })
    }
    const newBasket = await Basket.create({ userId: req.user.id, products: [{ productId, quentity }] })
    res.json({ message: "The product addad succsefuly", newBasket })
}

//Delete Product In Baket
const deleteProduct = async (req, res) => {
    const { productId } = req.body
    if (!productId)
        return res.status(400).send("all fileds are required")

    const basket = await Basket.findOne({ userId: req.user.id })
    if (basket) {
        const products = basket.products
        let arr = []

        arr = products.filter((p) => {
            return p.productId != productId
        })

        if (arr.length === 0) {
            arr = []
        }

        basket.products = arr
        const updateBasket = await basket.save()
        return res.json({ message: "product deleted from the basket!", updateBasket })
    }
}

module.exports = { getUserBasketById, addProductToBasket, deleteProduct }