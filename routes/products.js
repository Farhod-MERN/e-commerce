const {Router} = require("express")

const router = Router()

router.get("/",(req, res)=>{
    res.render("products", {
        title: "olx - Products",
        isProduct: true,
    })
})

module.exports = router