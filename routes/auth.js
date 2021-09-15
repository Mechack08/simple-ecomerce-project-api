const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");

//New User
router.post("/register", async (req, res) => {
  const newUser = new User({
    name: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRETE_PASSWORD
    ),
  });

  try {
    const userSaved = await newUser.save();
    res.status(201).json(userSaved);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
