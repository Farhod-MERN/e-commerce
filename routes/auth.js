const { Router } = require("express");
const User = require("../models/user");
const router = Router();
const bcrypt = require("bcrypt")

router.get("/register", async (req, res) => {
  res.render("register", {
    title: "olx | Register",
  });
});
router.get("/login", async (req, res) => {
  res.render("login", {
    title: "olx | Log in",
  });
});
router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const candidate = await User.findOne({ email });
    if (candidate) {
      const samePass = await bcrypt.compare(password, candidate.password)
      if (samePass) {
        req.session.user = candidate;
        req.session.isAuthenticated = true;

        req.session.save((err) => {
          if (err) throw err;
          res.redirect("/");
          console.log(req.body);
        });
      }
    } else {
      res.redirect("/auth/login");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const {
      email,
      firstname,
      lastname,
      address,
      number,
      password,
      gander,
      bio,
      ico,
    } = req.body;

    const candidate = await User.findOne({ email });
    if (candidate) {
      res.redirect("/auth/register");
    } else {
      const hashPass = await bcrypt.hash(password, 10)
      const user = new User({
        email,
        firstname,
        lastname,
        address,
        number,
        password: hashPass,
        gander,
        bio,
        ico,
        card: { items: [] },
      });
      await user.save();
      res.redirect("/auth/login");
    }

    res.redirect("/auth/login");
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
