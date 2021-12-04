const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post("/register", async (req, res) => {
  //check user is already in db
  const usernameExist = await User.findOne({ username: req.body.username });
  if (usernameExist)
    return res.status(400).json({ errorMsg: "Username already exist" });

  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //create user
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    password: hashPassword,
  });

  try {
    const savedUser = await user.save();
    //create and assign a token
    res.status(200).json({ user: user._id });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  //check user is already in db
  const user = await User.findOne({ username: req.body.username });
  if (!user)
    return res
      .status(401)
      .json({ errorMsg: "Username or password is wrong!!!" });

  //check password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res
      .status(401)
      .json({ errorMsg: "Username or password is wrong!!!" });

  //create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("token", token).send(token);
});

module.exports = router;
