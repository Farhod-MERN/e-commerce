const path = require("path")
const fs = require("fs")

// const pathToDb = path.join(__dirname, "..", "data", "card.json")
const pathToDb = path.join(path.dirname(process.mainModule.filename), "data", "card.json")


class Card {         // product = objectga 
    static async add(product){
        const card = await Card.fetch() // card = object
        
        const index = card.products.findIndex(c => c.id === product.id)

        const candidate = card.products[index]

        // basketda bu product bor yo'qligini tekshirish
        if(candidate){
            // basketda bu product bor
            candidate.count++
            card.products[index] = candidate
        }else{
            product.count = 1
            card.products.push(product)
        }
        card.price += +product.price

        return new Promise((resolve, reject)=>{
            fs.writeFile(pathToDb, JSON.stringify(card), (err, content)=>{
                if(err){
                    reject(err)
                }else{
                    resolve()
                }
            })
        })
    }

    static async fetch(){
        return new Promise((resolve, reject)=>{
            fs.readFile(pathToDb, "utf-8", (err, content)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(JSON.parse(content))
                }
            })
        })
    }
}

module.exports = Card