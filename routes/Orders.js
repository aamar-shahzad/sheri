const express = require("express");
const { Order } = require("../models/Order");

const router = express.Router();

router.get(`/`, async (req, res) => {
  const orderList = await Order.find();
  if (!orderList) {
    res.send(500).json({ sucess: false });
  }
  res.send(orderList);
});
router.post(`/`, (req, res) => {
  const order = new Order({
    ordername: req.body.ordername,
    image: req.body.image,
    countInStock: req.body.countInStock,
  });
  order
    .save()
    .then((createdOrder) => {
      res.status(201).json(createdOrder);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        sucess: false,
      });
    });
});
module.exports = router;
