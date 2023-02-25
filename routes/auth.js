const {Router} = require("express")
const User = require("../models/user")
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
    const user = await User.findById("63f6115fa9396c2663ec7fbd")
    req.session.user = user
    req.session.isAuthenticated = true
    
    req.session.save((err)=>{
        if(err) throw err
        
        res.redirect("/")
        console.log(req.body);
    })
})

router.post("/register", (req, res)=>{
    console.log(req.body);
    res.redirect("/auth/login")
})
module.exports = router