const express = require("express");
const { Category } = require("../models/Category");
const { Product } = require("../models/Product");
const mongoose = require("mongoose");
const router = express.Router();
router.get(`/`, async (req, res) => {
  let filter = {};
  if (req.query.category) {
    filter = { category: req.query.category.split(",") };
  }
  const ProductList = await Product.find(filter);
  if (!ProductList) {
    res.send(500).json({ sucess: false });
  }
  res.send(ProductList);
});

router.get(`/`, async (req, res) => {
  const ProductList = await Product.find().select("name");
  if (!ProductList) {
    res.send(500).json({ sucess: false });
  }
  res.send(ProductList);
});
router.get(`/:id`, (req, res) => {
  Product.findById(req.params.id)
    .populate("category")
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((err) => {
      res.status(500).json({ sucess: false, error: err });
    });
});

///insert record
router.post(`/`, async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).json({ message: "invalid Category " });
  const product = new Product({
    name: req.body.name,
    descrption: req.body.descrption,
    image: req.body.image,
    images: req.body.images,
    countInStock: req.body.countInStock,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    isFeatured: req.body.isFeatured,
    dateCreated: req.body.dateCreated,
  });
  product
    .save()
    .then((newProduct) => {
      res.status(200).json(newProduct);
    })
    .catch((err) => {
      res.status(500).json({ sucess: false, message: "No data added" });
    });
});
//update a product
router.put("/:id", async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).json({ message: "invalid Category " });
  const updateList = await Product.findOneAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      descrption: req.body.descrption,
      image: req.body.image,
      images: req.body.images,
      countInStock: req.body.countInStock,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      isFeatured: req.body.isFeatured,
      dateCreated: req.body.dateCreated,
    },
    {
      new: true,
    }
  );
  if (!updateList) {
    res.status(500).json({ sucess: false, message: "error in record Upadate" });
  } else {
    res.status(200).send(updateList);
  }
});
router.delete("/:id", (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res
      .status(500)
      .send({ sucess: false, message: "Invalid Product ID" });
  }
  Product.findByIdAndRemove(req.params.id)
    .then((Product) => {
      if (Product) {
        return res
          .status(200)
          .json({ sucess: true, message: "Data is Deleted Successfully" });
      } else {
        return res
          .status(404)
          .json({ sucess: false, message: "Data Not Found" });
      }
    })
    .catch((error) => {
      return res.status(500).json({ sucess: false, error: error });
    });
});
router.get(`/get/count`, (req, res) => {
  Product.countDocuments((count) => count)
    .then((resp) => {
      res.status(200).send({ productCount: resp });
    })
    .catch((err) => {
      res.status(500).json({ sucess: false, error: err });
    });
});

router.get(`/get/featured/:count`, (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  Product.find({ isFeatured: true })
    .limit(+count)
    .then((resp) => {
      res.status(200).send(resp);
    })
    .catch((err) => {
      res.status(500).json({ sucess: false, error: err });
    });
});

module.exports = router;
