const Joi = require("joi");
const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1000,
  },
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  description: {
    type: String,
    minlength: 5,
    maxlength: 1050,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  discount: {
    type: Number,
  },
  currentQuantity: {
    type: Number,
  },
  thresholdQuantity: {
    type: Number,
  },
});

const Products = mongoose.model("products", productsSchema);

function validateProducts(product) {
  const schema = {
    _id: Joi.string(),
    category: Joi.string().min(2).required(),
    title: Joi.string().min(5).required(),
    img: Joi.string().min(5).required(),
    description: Joi.string().min(5).required(),
    price: Joi.number().required(),
    discount: Joi.number(),
    currentQuantity: Joi.number(),
    thresholdQuantity: Joi.number()
  };

  return Joi.validate(product, schema);
}

exports.Products = Products;
exports.validate = validateProducts;
