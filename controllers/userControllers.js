const User = require("../models/userModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken");
const userRegister = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).send("Enter all input fields");
    return;
  }
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    res.status(400).send("You are already registered. Please login");
    return;
  }
  const newUser = await User.create({
    name,
    email,
    password,
  });
  if (newUser) {
    res.status(201).send({
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
    return;
  } else {
    res.status(500).send("Server Error");
  }
};

module.exports = { userRegister };
