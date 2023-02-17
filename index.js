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
    res.render("index")
})

app.use(express.static("public"))

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`Server is running : ${PORT}`);
    console.log(`http://localhost:${PORT}`);
})
