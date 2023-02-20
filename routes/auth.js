const {Router} = require("express")

const router = Router()

router.get("/register",(req, res)=>{
    res.render("register",{
        title: 'olx | Register'
    })
})
router.get("/login",(req, res)=>{
    res.render("login",{
        title: 'olx | Log in'
    })
})

module.exports = router