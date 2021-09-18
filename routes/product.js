const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//CREATE- NEW PRODUCTE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product({
    title: req.body.title,
    description: req.body.description,
    img: req.body.img,
    color: req.body.color,
    size: req.body.size,
    category: req.body.category,
    price: req.body.price,
  });

  try {
    const saved = await newProduct.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE- PRODUCT
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updated = await new Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE- PRODUCT
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await new Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product deleted !");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET SINGLE PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const getProduct = await new Product.findById(req.params.id);
    res.status(200).json(getProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT BY ... cat, new
router.get("/", async (req, res) => {
  const queryNew = req.query.new;
  const queryCategory = req.query.category;

  try {
    let products;
    if (queryNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(2);
    } else if (queryCategory) {
      products = await Product.find({ category: { $in: [queryCategory] } });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
