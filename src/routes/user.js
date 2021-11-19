const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.get("/me", auth, async (req, res) => {
  try {
    const token = req.headers.authorization.split("Bearer ").join("");
    var decoded = jwt.decode(token, { complete: true });
    const userId = decoded.payload._id;

    const user = await User.find({ _id: userId });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.query.id;

    const user = await User.find({ _id: userId });
    res.status(200).json(user);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
