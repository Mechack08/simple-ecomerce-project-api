const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");

const router = require("express").Router();

//CREATE- NEW PRODUCTE
router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const saved = await newCart.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE- PRODUCT
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updated = await new Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE- CART
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await new Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart deleted !");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const getCart = await new Cart.findOne({ userId: req.params.userId });
    res.status(200).json(getCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
