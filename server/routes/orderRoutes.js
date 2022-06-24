const express = require("express");
const Order = require("../models/orderModel");
const isAuth = require("../middleware/isAuth.js");
const expressAsyncHandler = require("express-async-handler");

const generateToken = require("../../server/webToken");

const orderRouter = express.Router();

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });

    const order = await newOrder.save();
    res.status(201).send({ msg: "New order created", order });
  })
);

module.exports = orderRouter;
