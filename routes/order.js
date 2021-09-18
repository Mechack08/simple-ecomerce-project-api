const Order = require("../models/Order");
const {
  verifyTokenAndAdmin,
  verifyToken,
  verifyTokenAndAuthorization,
} = require("./verifyToken");
const router = require("express").Router();

//CREATE- NEW ORDER
router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const saved = await newOrder.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE- ORDER
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updated = await new Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE- ORDER
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await new Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order deleted !");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDER
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const getOrder = await Order.find({ userId: req.params.userId });
    res.status(200).json(getOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const oders = await Order.find();
    res.status(200).json(oders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET STATS INCOME
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: prevMonth } } },
      { $project: { month: { $month: "$createdAt" }, sales: "$amount" } },
      { $group: { _id: "$month", total: { $sum: "$sales" } } },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
