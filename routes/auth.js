const {Router} = require("express")
const router = Router()

router.get("/register", async(req, res)=>{
    res.render("register",{
        title: 'olx | Register'
    })
})
router.get("/login",async (req, res)=>{
    res.render("login",{
        title: 'olx | Log in'
    })
})
router.get("/logout", async(req, res)=>{
    req.session.destroy(()=>{
        res.redirect("/auth/login")
    }) 
})

router.post("/login", async(req, res)=>{
    req.session.isAuthenticated = true
    console.log(req.body);
    res.redirect("/")
})

router.post("/register", (req, res)=>{
    console.log(req.body);
    res.redirect("/auth/login")
})
module.exports = router