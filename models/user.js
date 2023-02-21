const { Schema, model } = require("mongoose");

const userschema = {
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
};

module.exports = model("User", userschema)