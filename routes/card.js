const {Router} = require("express")
const router = Router()
const Product = require("../models/product")
const Card = require("../models/card")


router.get("/", async (req, res)=>{
    const card = ""
    // const card = Card.fetch()
    
    res.render("card", {
        title: "olx | Card",
        card: card,
    })
})

router.post("/add",async (req, res)=>{
    const product = await Product.getById(req.body.id)
    
    await Card.add(product)

    res.redirect("/card")
})

module.exports = router