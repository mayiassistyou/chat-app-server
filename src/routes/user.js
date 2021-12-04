const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// get me
router.get("/me", auth, async (req, res) => {
  try {
    const token = req.headers.authorization.split("Bearer ").join("");
    var decoded = jwt.decode(token, { complete: true });
    const userId = decoded.payload._id;

    const user = await User.findOne({ _id: userId });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get user by id
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.query.id;

    const user = await User.findOne({ _id: userId });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// search user
router.get("/search", async (req, res) => {
  try {
    const users = await User.find({
      $or: [
        { name: { $regex: req.query.name.trim() } },
        { username: { $regex: req.query.name.trim() } },
      ],
    });

    const token = req.headers.authorization.split("Bearer ").join("");
    var decoded = jwt.decode(token, { complete: true });
    const userId = decoded.payload._id;

    const friends = users.filter((user) => user.id !== userId);

    res.status(200).json(friends);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
