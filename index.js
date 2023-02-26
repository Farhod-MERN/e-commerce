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
const session = require("express-session")
const MongoStore = require("connect-mongodb-session")(session)
const User = require('./models/user')
const app = express();
const varMiddleware = require("./middleware/var")
const userMiddleware = require("./middleware/user")
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
  handlebars: allowInsecurePrototypeAccess(Handlebars)
});

const MONGO_URI = "mongodb+srv://farhod:f79cMiYYYphGDQxR@cluster0.ruecq8q.mongodb.net/?retryWrites=true&w=majority";
const store = new MongoStore({
  collection: "sessions",
  uri: MONGO_URI,
})
app.use(session({
  secret: "My secret key",
  resave: false,
  saveUninitialized:false,
  store: store
}))

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(varMiddleware)
app.use(userMiddleware)

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
      mongoose.set("strictQuery", false);
      
      await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true
    });
    console.log("Mongo is connected");

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
//  cd /d/2_WEB/5_Express/myOlx