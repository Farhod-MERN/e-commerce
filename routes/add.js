const {Router} = require("express")
const Product = require("../models/product")

const router = Router()

router.get("/",(req, res)=>{
    res.render("add",{
        title: "olx - Create Product",
        isAdd: true,
    })
})

router.post("/",async (req, res)=>{
    const data = {...req.body, userId:req.user} // shu orqali postni kim yaratganini bila olamiz
    const product = await (await Product.create(data))
    console.log(product);
    // const {name, quality, tel, description, image, category, address, price} = req.body
    // const product = new Product(name, quality, tel, description, image, category, address, price)
    
    // await product.save();
    res.redirect("/add")
})



module.exports = router