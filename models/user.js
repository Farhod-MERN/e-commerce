const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  card: {
    items: [
      {
        count: {
          type: Number,
          required: true,
          default: 1,
        },
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
  },
})

// function dan foydalan arrow func dan emas , sababi function o'zining Context thisiga ega
userSchema.methods.AddToCard = function(product) {
  let items = [...this.card.items] 
  
  const index = items.findIndex(s =>{ 
    return s.productId.toString() === product._id.toString()  //userID va _id ObjectID formatda , ularni tenglashda muammo bo'lishi mumkun, shunga stringa o'tkazib tengladim
  })
  // agar product savatda bo'lsa
  if(index >= 0){
    items[index].count = items[index].count + 1
  }else{
    items.push({
      productId: product._id,
      count: 1,
    })
  }
   // const newCard = { this.card.items: items}
  // this.card = newCard
  this.card = { items }
  
  return this.save() //keyin o'zgarishlarni saqlab qo'yish kerak

}

module.exports = model("User", userSchema)