const {Router} = require("express")

const router = Router()

router.get("/",(req, res)=>{
    res.render("add",{
        title: "olx - Create Product",
        isAdd: true,
    })
})

router.post("/",(req, res)=>{
    console.log(req.body);
    res.redirect("/add")
})



module.exports = router