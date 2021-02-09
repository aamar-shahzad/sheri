const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  passwordHash: {
    type: String,
  },
  street: {
    type: String,
    defualt: "",
  },
  city: {
    type: String,
    defualt: "",
  },
  zip: {
    type: String,
  },
  country: {
    type: String,
    defualt: "",
  },
  isAdmin: {
    type: Boolean,
  },
});
userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
userSchema.set("toJSON", {
  virtuals: true,
});
exports.User = mongoose.model("User", userSchema);
