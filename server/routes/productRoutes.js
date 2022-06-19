const express = require("express");
const Product = require("../models/productModel.js");

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

productRouter.get("/slug/:slug", async (req, res) => {
  const { slug } = req.params;
  const product = await Product.findOne({ slug: slug });
  if (product) {
    res.json(product);
  } else {
    res.status(404).send({ msg: "Product not found" });
  }
});

productRouter.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send({ msg: "Product not found" });
  }
});

module.exports = productRouter;
