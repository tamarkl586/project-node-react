const Category = require("../models/Category")

const getAllCategoreis = async(req, res) =>{
    const categoreis = await Category.find().lean()
    res.json(categoreis)
}

const addCategory = async(req, res) =>{
    const {name} = req.body
    if(!name)
        res.status(400).send("name is required!")
    const findCategory = await Category.findOne({name}).lean()
    if(findCategory)
        res.status(409).send("category allready exist")
    const category = await Category.create({name})
    res.json(`new category created - ${category.name}`)
}

const updateCategory = async(req, res) =>{
    const {id} = req.params
    const { name } = req.body
    if(!name)
        res.status(400).send("name is required!")
    const category = await Category.findById({_id: id})
    if(!category)
        res.status(400).send("category not found!")
    category.name = name
    const updatedCategory = await category.save()
    res.json(`${updatedCategory.name} - updated!`)
}

const deleteCategory = async (req, res) => {
    const { id } = req.params
    const category = await Category.findOne({_id: id}).exec()
    if (!category)
        res.status(400).send("category not found!")
    await category.deleteOne()
    res.send("category deleted!")
}

module.exports = {getAllCategoreis, addCategory, updateCategory, deleteCategory}