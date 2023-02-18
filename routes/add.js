const {Router} = require("express")

const router = Router()

router.get("/",(req, res)=>{
    res.render("add",{
        title: "olx - Create Product",
        isAdd: true,
    })
})

module.exports = router