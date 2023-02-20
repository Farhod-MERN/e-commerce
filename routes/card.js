const {Router} = require("express")
const router = Router()
const Product = require("../models/product")
const Card = require("../models/card")


router.get("/", async (req, res)=>{
    const card = await Card.fetch()
    console.log(card.products);
    res.render("card", {
        title: "olx | Card",
        products: card.products,
        price: card.price
    })
})

router.post("/add",async (req, res)=>{
    const product = await Product.getById(req.body.id)
    
    await Card.add(product)

    res.redirect(`/products/${req.body.id}`)
})

router.delete("/remove/:id", async (req, res)=>{
    const card = await Card.remove(req.params.id)
    res.status(200).send(card)
})

module.exports = router