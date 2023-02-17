const express = require("express")
const exphbs = require("express-handlebars")

const app = express()

const hbs = exphbs.create({
    defaultLayout: "main",
    extname : "hbs" 
})

app.engine("hbs", hbs.engine)
app.set("view engine", "hbs")
app.set("views", "views")

app.get("/",(req, res)=>{
    res.render("index",{
        title: "olx - Electronic business",
        isHome: true,
    })
})
app.get("/products",(req, res)=>{
    res.render("products", {
        title: "olx - Products",
        isProduct: true,
    })
})
app.get("/add",(req, res)=>{
    res.render("add",{
        title: "olx - Create Product", 
        isAdd: true
    })
})

app.use(express.static("public"))

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`Server is running : ${PORT}`);
    console.log(`http://localhost:${PORT}`);
})
