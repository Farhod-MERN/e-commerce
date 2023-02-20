const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

class Product {
    constructor(
        name,
        quality,
        tel,
        description,
        image,
        category,
        address,
        price
    ) {
        this.name = name;
        this.quality = quality;
        this.tel = tel;
        this.description = description;
        this.image = image;
        this.category = category;
        this.address = address;
        this.price = price;
        this.id = uuidv4();
    }

    productObj() {
        return {
            name: this.name,
            quality: this.quality,
            tel: this.tel,
            description: this.description,
            image: this.image,
            category: this.category,
            address: this.address,
            price: this.price,
            id: this.id,
        }
    }

    async save() {
        const products = await Product.getAll()
        products.push(this.productObj())

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, "..", "data", "product.json"),
                JSON.stringify(products),
                (err) => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve()
                    }
                }
            );
        });

    }
    // bu server bilan ishlashi kerakligi uchun bu async ishlashi kerak, shunga biz bu funcsionni promise ga olib oldik 
    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, "..", "data", "product.json"),
                "utf-8",
                (err, content) => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve(JSON.parse(content))
                    }
                }
            );
        });
    }

    // product = req.body -> req.body /products/edit ga post qilgandagi

    static async update(product){
        const products = await Product.getAll()
        // console.log(products);
        const inx = products.findIndex(c => c.id === product.id)
        
        // console.log(inx);

        products[inx] = product

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, "..", "data", "product.json"),
                JSON.stringify(products),
                (err) => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve()
                    }
                }
            );
        });
    }

    static async getById(id){
        const product = await Product.getAll() // product = array => [{id: 1}, {id: 2}]
        return product.find(c => c.id === id)
    }
    static async categoryLaptop(){
        const products = await Product.getAll() // product = array => [{id: 1}, {id: 2}]
        return products.filter(c => c.category === "Laptop")
    }
    static async categoryPhone(){
        const products = await Product.getAll() // product = array => [{id: 1}, {id: 2}]
        return products.filter(c => c.category === "Phone")
    }
    static async categoryEquipment(){
        const products = await Product.getAll() // product = array => [{id: 1}, {id: 2}]
        return products.filter(c => c.category === "Equipment")
    }
    static async categoryOther(){
        const products = await Product.getAll() // product = array => [{id: 1}, {id: 2}]
        return products.filter(c => c.category === "Other")
    }

}
module.exports = Product
