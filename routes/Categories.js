const express = require("express");
const { Category } = require("../models/Category");

const router = express.Router();
///get alll record
router.get(`/`, async (req, res) => {
  const catagroyList = await Category.find();
  if (!catagroyList) {
    res.send(500).json({ sucess: false });
  }
  res.status(200).send(catagroyList);
});
///get record by id
router.get(`/:id`, async (req, res) => {
  const catagroyList = await Category.findById(req.params.id);
  if (!catagroyList) {
    res.send(500).json({ sucess: false, message: "No Data Found of This ID" });
  }
  res.status(200).send(catagroyList);
});
//////update record
router.put(`/:id`, async (req, res) => {
  const updatedcatagroyList = await Category.findOneAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      image: req.body.image,
      color: req.body.color,
      icon: req.body.icon,
    },
    {
      new: true,
    }
  );
  if (!updatedcatagroyList) {
    res.send(500).json({ sucess: false, message: "No Data Found of This ID" });
  }
  res.status(200).send(updatedcatagroyList);
});
//insert record
router.post(`/`, (req, res) => {
  const category = new Category({
    name: req.body.name,
    image: req.body.image,
    color: req.body.color,
    icon: req.body.icon,
  });
  category
    .save()
    .then((createdCategory) => {
      res.status(201).json(createdCategory);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        sucess: false,
      });
    });
});
/// delete record
router.delete("/:id", (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
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
module.exports = router;
