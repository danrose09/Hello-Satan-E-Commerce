const express = require("express");
const Product = require("../models/productModel.js");
const products = require("../data/products");
const User = require("../models/userModel.js");
const users = require("../data/users");

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await Product.deleteMany({});
  const createdProducts = await Product.insertMany(products);
  // res.send({ createdProducts });

  await User.deleteMany({});
  const createdUsers = await User.insertMany(users);
  res.send({ createdProducts, createdUsers });
});

module.exports = seedRouter;
