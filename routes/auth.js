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
    ).toString(),
  });

  try {
    const userSaved = await newUser.save();
    res.status(201).json(userSaved);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.username });
    !user && res.status(401).json("Wrong credentials");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRETE_PASSWORD
    );
    const pwd = hashedPassword.toString(CryptoJS.enc.Utf8);

    pwd !== req.body.password && res.status(401).json("Wrong credentials");

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
