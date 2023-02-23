const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const homeRouter = require("./routes/home");
const addRouter = require("./routes/add");
const productsRouter = require("./routes/products");
const cardRouter = require("./routes/card");
const authRouter = require("./routes/auth");
const feedbackRouter = require("./routes/feedback")
const orderRouter = require("./routes/order")
const User = require('./models/user')
const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
  handlebars: allowInsecurePrototypeAccess(Handlebars)
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(async (req, res, next)=>{
  try {
    const user = await User.findById("63f6115fa9396c2663ec7fbd")
    req.user = user // bu global o'zgaruvchi bo'ldi, buni qayerda req bo'lsa o'sha joyda ishlata olaman
    next()
  } catch (error) {
    console.log(error);
  }
})

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRouter);
app.use("/add", addRouter);
app.use("/products", productsRouter);
app.use("/card", cardRouter);
app.use("/auth", authRouter);
app.use("/feedback", feedbackRouter)
app.use("/orders", orderRouter)
app.use(express.json());

async function starter (){
  try {
    const url =
      "mongodb+srv://farhod:f79cMiYYYphGDQxR@cluster0.ruecq8q.mongodb.net/?retryWrites=true&w=majority";
      
      mongoose.set("strictQuery", false);
      
      await mongoose.connect(url, {
      useNewUrlParser: true
    });
    console.log("Mongo is connected");

    const candidate = await User.findOne()

    if(!candidate){
      const user = new User({
        email: "mrfarhod58@gmail.com",
        name: "Farhod",
        card: {items: []}
      })
      await user.save()

    }

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running : ${PORT}`);
      console.log(`http://localhost:${PORT}`);
    });
  } catch (e){
    console.log(e);
  }
};

starter()

// f79cMiYYYphGDQxR

// mongodb+srv://farhod:f79cMiYYYphGDQxR@cluster0.ruecq8q.mongodb.net/?retryWrites=true&w=majority
