const {Router} = require("express")
const Product = require("../models/product")
const authMiddleware = require("../middleware/auth")
const {addVal} = require("../utils/validate")
const {validationResult} = require("express-validator/check")

const router = Router()

router.get("/", authMiddleware,(req, res)=>{
    res.render("add",{
        title: "olx - Create Product",
        isAdd: true,
    })
})

router.post("/",authMiddleware, addVal,async (req, res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const {name, quality, tel, description, image, category, address, price} = req.body
        res.render("add",{
            title: "olx - Create Product",
            isAdd: true,
            data: {name, quality, tel, description, image, category, address, price},
            error: errors.array()[0].msg
        })
    }
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