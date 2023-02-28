const {body} = require("express-validator/check");  
const User = require("../models/user");

exports.regVal = [
    body("firstname", "Your First Name should be in 3 -> 24 symbols!").isLength({min:3, max:24}).trim(),
    body("lastname", "Your Last Name should be in 3 -> 24 symbols!").isLength({min:3, max:24}).trim(),
    body("email", "Enter your email correctly !").isEmail().custom( async(value, {req})=>{
      try {
        const user = await User.findOne({email: value})
        if(user){
            return Promise.reject("This email is already exsist !")
        }
      } catch (error) {
        console.log(error);
      }  
    }).normalizeEmail().trim(),
    body("address", "Your Address should be in 3 -> 56 symbols!").isLength({min:3, max:56}).trim(),
    body("number", "Enter your Number correctly").isLength({min:6, max:16}).trim(),
    body("password", "Your password should be in 6 -> 56 symbols!").isLength({min:6, max:56}).isAlphanumeric().trim(),
]