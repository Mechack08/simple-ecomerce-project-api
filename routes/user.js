const router = require("express").Router();

router.get("/test", (req, res) => res.send("Welcome"));

router.post("/posttest", (req, res) => {
  username = req.body.username;
  res.send(username);
});

module.exports = router;
