const express = require("express")
const exphbs = require("express-handlebars")
const homeRouter = require("./routes/home")
const addRouter = require("./routes/add")
const productsRouter = require("./routes/products")

const app = express()

const hbs = exphbs.create({
    defaultLayout: "main",
    extname : "hbs" 
})

app.engine("hbs", hbs.engine)
app.set("view engine", "hbs")
app.set("views", "views")



app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))

app.use("/", homeRouter)
app.use("/add" ,addRouter)
app.use("/products" ,productsRouter)
app.use(express.json())



const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`Server is running : ${PORT}`);
    console.log(`http://localhost:${PORT}`);
})
