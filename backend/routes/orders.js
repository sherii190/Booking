const { Orders } = require("../models/orders");
const { Products } = require("../models/products");
const express = require("express");
const router = express.Router();

router.get("/user/:user", async (req, res) => {
  if (!req.params.user) return res.status(422).send({ message: `Provide user information` })
  let query = {
    user: req.params.user
  };

  let perPage = 1
    , page = (req.query.page || 1)

  let count = await Orders.count(query);

  let orders = await Orders.find(query).limit(perPage)
    .skip(perPage * (+page - 1))
  res.send({
    orders,
    page,
    pages: Math.ceil(count / perPage),
    perPage,
    total: count
  });
});

router.post("/", async (req, res) => {

  try {
    let order = new Orders(req.body);
    order = await order.save();

    req.body.items.forEach(async item => {
      let p = await Products.findById(item._id);
      console.log(p, "prod");
      if(p) {
        p.currentQuantity -= item.quantity;
        await p.save();
      }
    })

    res.send(order);
  } catch (err) {
    res.status(422).send({ err })
  }
});

module.exports = router;
