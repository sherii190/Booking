const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Products, validate } = require("../models/products");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
var url = require("url");

router.get("/", async (req, res) => {
  let products = [];
  if (req.query.category === "all")
    products = await Products.find().sort(
      req.query.price === "asc" ? "price" : "-price"
    );
  else
    products = await Products.find({ category: req.query.category }).sort(
      req.query.price === "asc" ? "price" : "-price"
    );

  res.send(products);
});

router.get("/admin/list", async (req, res) => {

  let query = {};
  let perPage = 10
    , page = (req.query.page || 1)

  let count = await Products.count(query);

  let products = await Products.find(query).limit(perPage)
    .skip(perPage * (+page-1))
  res.send({
    products,
    page,
    pages: Math.ceil(count / perPage),
    perPage,
    total: count
  });
});

router.get("/discount", async (req, res) => {
  const products = await Products.find().sort("title");
  res.send(products);
});

router.post("/", async (req, res) => {
  console.log(req.body)
  delete req.body._id;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let product = new Products(req.body);
  product = await product.save();

  res.send(product);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const product = await Products.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

router.delete("/:id", async (req, res) => {
  const product = await Products.findByIdAndRemove(req.params.id);

  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

router.get("/:id", async (req, res) => {
  const product = await Products.findById(req.params.id);

  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

router.get("/category/:category", async (req, res) => {
  const product = await Products.findOne({ category: req.params.category });

  if (!product)
    return res
      .status(404)
      .send("The product with the given category was not found.");

  res.send(product);
});

module.exports = router;
