const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  ordername: String,
  image: String,
  countInStock: Number,
});
exports.Order = mongoose.model("Order", orderSchema);
