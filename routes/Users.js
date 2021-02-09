const { User } = require("../models/User");

const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const users = await User.find().select("-passwordHash");
  if (!users) {
    res.status(500).send("No User Found");
  } else {
    res.status(200).send(users);
  }
});
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-passwordHash");
  if (!user) {
    res.status(500).send("No User Found");
  } else {
    res.status(200).send(user);
  }
});
router.post("/", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    street: req.body.street,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    isAdmin: req.body.isAdmin,
  });
  const newUsercreated = await newUser.save();
  if (!newUsercreated) {
    res.status(500).send("No User created");
  } else {
    res.status(200).send(newUsercreated);
  }
});
router.post("/register", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    street: req.body.street,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    isAdmin: false,
  });
  const newUsercreated = await newUser.save();
  if (!newUsercreated) {
    res.status(500).send("No User Register");
  } else {
    res.status(200).send(newUsercreated);
  }
});

router.post("/login", (req, res) => {
  const sec = process.env.secret;
  User.findOne({ email: req.body.email }).then((data) => {
    if (!data) {
      return res.status(400).send("Email is wrong");
    }
    if (data && bcrypt.compareSync(req.body.password, data.passwordHash)) {
      const token = jwt.sign(
        {
          userID: data.id,
          isAdmin: data.isAdmin,
        },
        sec,
        {
          expiresIn: "1d",
        }
      );
      return res.status(200).send({
        success: true,
        message: "Access Granted Successfully",
        email: data.email,
        token: token,
      });
    } else {
      res.status(400).send("passwod is wrong");
    }
  });
});
router.get(`/get/count`, (req, res) => {
  User.countDocuments((count) => count)
    .then((resp) => {
      res.status(200).send({ UserCount: resp });
    })
    .catch((err) => {
      res.status(500).json({ sucess: false, error: err });
    });
});
module.exports = router;
