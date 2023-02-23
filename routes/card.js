const {Router} = require("express")
const router = Router()
const Product = require("../models/product")
const User = require("../models/user")

function mapCard(arr){
    return arr.items.map(s =>({
        ...s.productId._doc,
        count: s.count 
    }))
}

function productPrice(products){
    return products.reduce((total, product)=>{
        return total += product.price * product.count
    }, 0)
}

const Card = require("../models/card")

router.post("/add",async (req, res)=>{
    const product = await Product.findById(req.body.id)
    await req.user.AddToCard(product)
    res.redirect("/card")
})
router.delete("/remove/:id", async (req, res)=>{
    const card = await Card.remove(req.params.id)
    res.status(200).send(card)
})
router.get("/", async (req, res)=>{
    const user = await req.user.populate("card.items.productId") // bu yerda populate qilinishi kerak massivgacha yo'l va massivdagi nimani populate qilishni ko'rsatiladi
    console.log(user.card.items);

    const products = mapCard(user.card)
    res.render("card", {
        title: "olx | Card",
        products: products,
        price: productPrice(products)
    })
})

module.exports = router