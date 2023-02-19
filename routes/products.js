const {Router} = require("express")
const Product = require("../models/product")

const router = Router()

router.get("/", async(req, res)=>{
    const products = await Product.getAll()
    res.render("products", {
        title: "olx - Products",
        isProduct: true,
        products: products,
    })
})
router.get("/laptop", async(req, res)=>{
    const products = await Product.categoryLaptop()
    // console.log(products);
    res.render("products", {
        title: "olx - Products",
        isProduct: true,
        products: products,
    })
})
router.get("/phone", async(req, res)=>{
    const products = await Product.categoryPhone()
    // console.log(products);
    res.render("products", {
        title: "olx - Products",
        isProduct: true,
        products: products,
    })
})
router.get("/equipment", async(req, res)=>{
    const products = await Product.categoryEquipment()
    // console.log(products);
    res.render("products", {
        title: "olx - Products",
        isProduct: true,
        products: products,
    })
})
router.get("/other", async(req, res)=>{
    const products = await Product.categoryOther()
    // console.log(products);
    res.render("products", {
        title: "olx - Products",
        isProduct: true,
        products: products,
    })
})
router.get("/:id", async (req, res)=>{
    const id = req.params.id
    const product = await Product.getById(id)
    res.render("detail", {
        product: product
    })
})
router.get("/:id/edit", async (req, res)=>{
    if(!req.query.allow){
        return res.redirect("/")
    }

    const id = req.params.id
    const product = await Product.getById(id)

    res.render("edit-product",{
        title: `Edit ${product.name}`,
        product: product
    })
})

router.post("/edit", async (req, res)=>{
    await Product.update(req.body)
    res.redirect("/products")
})

module.exports = router