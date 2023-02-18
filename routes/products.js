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
router.get("/:id", (req, res)=>{
    const id = req.params
    res.render("detail")
})



module.exports = router