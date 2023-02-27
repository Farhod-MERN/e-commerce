const {Router} = require("express")
const User = require("../models/user")
const router = Router()
const bcrypt = require("bcrypt")

router.get("/:id", async (req, res)=>{
    const user = await User.findById(req.params.id)
    res.render("profile", {
        title: "olx | My Profile",
        profile: user
    })
})
router.get("/edit/:id", async (req, res)=>{
    const profile = await req.user

    res.render("editProfile", {
        title: "olx | Edit Profile",
        profile: profile
    })
})
router.post("/edit", async (req, res)=>{
    const {
        password,
        gander,
        ico} = await req.user

    
    const user = await User.findByIdAndUpdate(req.user._id, {
        email: req.body.email,
        firstname: req.body.firstname,
        lastname:req.body.lastname,
        address:req.body.address,
        number: req.body.number,
        password:password,
        gander:gander,
        bio: req.bio,
        ico: ico} )
    res.redirect(`/profile/${req.user._id}`)
})

module.exports = router