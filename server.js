const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoute = require("./routes/user");
const userAuth = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Succefully connected to MongoDb !"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

app.use("/api/auth", userAuth);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 5500, () => {
  console.log("Listening on port " + process.env.PORT);
});
