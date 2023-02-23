const { Router } = require("express");
const Order = require("../models/order");
const router = Router();

router.get("/", async (req, res) => {
  const author = await req.user.name;
  const orders = await Order.find();
  try {
    res.render("order", {
        title: "olx | My Orders",
        name: author,
        orders: orders,
      });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await req.user.populate("card.items.productId");
    const products = user.card.items.map((s) => ({
      product: { ...s.productId._doc },
      count: s.count,
    }));
    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user,
      },
      products: products,
    });
    await order.save();
    await req.user.cleanCard(); // bu order bo'lgandan keyin basketni tozalab tashlaydi va Orderda keyin ko'rinadi ular
    res.redirect("/orders");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
