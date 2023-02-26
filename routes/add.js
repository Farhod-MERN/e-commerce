const {Router} = require("express")
const Product = require("../models/product")
const authMiddleware = require("../middleware/auth")

const router = Router()

router.get("/", authMiddleware,(req, res)=>{
    res.render("add",{
        title: "olx - Create Product",
        isAdd: true,
    })
})

router.post("/",authMiddleware,async (req, res)=>{
    console.log(req.body);
    const product = new Product({
        name: req.body.name,
        quality:req.body.quality,
        tel: req.body.tel,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category,
        address:req.body.address,
        price: req.body.price,
        userId: req.user
    })
    try {
        await product.save()
        res.redirect("/products") 

    } catch (error) {
        console.log(error);
    }
    // const data = {...req.body, userId:req.user} // shu orqali postni kim yaratganini bila olamiz
    // const product = await (await Product.create(data))
    // console.log(product);
    // const {name, quality, tel, description, image, category, address, price} = req.body
    // const product = new Product(name, quality, tel, description, image, category, address, price)
    
    // await product.save();
    // res.redirect("/add")
})



module.exports = router