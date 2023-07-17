const bcrypt = require("bcrypt");
const { errorHandling } = require("../helpers");
const { User } = require("../model/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(409).json({ message: "Email in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    password: hashedPassword,
    subscription,
  });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ message: "Email or password is wrong" });
  }
  const comparePassword = await bcrypt.compare(
    password,
    user.password
  );

  if (!comparePassword) {
    res.status(401).json({ message: "Email or password is wrong" });
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  if (!_id) {
    res.status(401).json({ message: "Not authorized" });
  }
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json("No Content");
};

module.exports = { register, login, logout };
