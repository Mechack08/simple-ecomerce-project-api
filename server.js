const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const userAuth = require("./routes/auth");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Succefully connected to MongoDb !"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use("/api/auth", userAuth);
app.use("/api/users", userRoute);

app.listen(process.env.PORT || 5500, () => {
  console.log("Listening on port " + process.env.PORT);
});
