const {Router} = require("express")
const Product = require("../models/product")
const User = require("../models/user")

const router = Router()

router.get("/", async(req, res)=>{
    const products = await Product.find().populate("userId")
    res.render("products", {
        title: "olx - Products",
        isProduct: true,
        products: products.reverse(),
    })
})
router.get("/laptop", async(req, res)=>{
    const products = await Product.find({category : "Laptop"})
    res.render("products", {
        title: "olx - Products",
        isProduct: true,
        products: products ? products.reverse() : [],
    })
})
router.get("/phone", async(req, res)=>{
    const products = await Product.find({category : "Phone"})
    res.render("products", {
        title: "olx - Products",
        isProduct: true,
        products: products ? products.reverse() : [],
    })
})
router.get("/equipment", async(req, res)=>{
    const products = await Product.find({category : "Equipment"})
    res.render("products", {
        title: "olx - Products",
        isProduct: true,
        products: products ? products.reverse() : [],
    })
})
router.get("/other", async(req, res)=>{
    const products = await Product.find({category: "Other"})
    res.render("products", {
        title: "olx - Products",
        isProduct: true,
        products: products ? products.reverse() : [],
    })
})
router.get("/:id", async (req, res)=>{
    const id = req.params.id
    const product = await Product.findById(id)
    const user = await User.findById(product.userId)
    res.render("detail", {
        product: product,
        user: user,
    })
})
router.get("/:id/edit", async (req, res)=>{
    if(!req.query.allow){
        return res.redirect("/")
    }

    const id = req.params.id
    const product = await Product.findById(id)

    res.render("edit-product",{
        title: `Edit ${product.name}`,
        product: product
    })
})

router.post("/edit", async (req, res)=>{
    await Product.findByIdAndUpdate(req.body.id, req.body)
    res.redirect("/products")
})
router.get("/remove/:id", async (req, res)=>{
    // Product.deleteOne({_id: req.params.id})

    try {
        await Product.findByIdAndRemove(req.params.id)
        res.redirect("/products")
    } catch (error) {
        console.log(error);        
    }
})



module.exports = router