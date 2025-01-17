const path = require("path");
const fs = require("fs/promises");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");
require("dotenv").config();

const { User } = require("../model/user");
const sendEmail = require("../helpers/sendEmail");
const { errorHandling } = require("../helpers");

const { SECRET_KEY } = process.env;
const { PORT } = process.env;

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(409).json({ message: "Email in use" });
  }

  const avatarURL = gravatar.url(email);
  const verificationCode = nanoid();
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    password: hashedPassword,
    subscription,
    avatarURL,
    verificationToken: verificationCode,
  });

  const mail = {
    to: email,
    subject: "Verify your email",
    html: `<a href="http://localhost:${PORT}/users/verify/${verificationCode}">Press here</a>`,
  };
  await sendEmail(mail);
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

  if (!user.verify) {
    res.status(404).json({ message: "User not found" });
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

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    email,
    subscription,
  });
};

const avatarsDir = path.join(
  __dirname,
  "../../",
  "public",
  "avatars"
);

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const extention = originalname.split(".").pop();
  const filename = `${_id}.${extention}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  Jimp.read(resultUpload)
    .then((lenna) => {
      return (
        lenna
          .resize(250, 250) // resize
          // .quality(60) // set JPEG quality
          // .greyscale() // set greyscale
          .write(resultUpload)
      ); // save
    })
    .catch((err) => {
      console.error(err);
    });
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({
    avatarURL,
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    // throw errorHandling(404, "User not found");
    res.status(404).json({ message: "User not found" });
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });
  res.status(200).json({ message: "Verification successful" });
};

const resentVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw errorHandling(404, `{ message: "User not found" }`);
  }
  if (user.verify) {
    res.status(400).json({
      message: "Verification has already been passed",
    });
  }

  const mail = {
    to: email,
    subject: "Verify your email",
    html: `<a href="http://localhost:${PORT}/users/verify/${user.verificationToken}">Press here</a>`,
  };
  await sendEmail(mail);
  res.status(200).json({ message: "Verification email sent" });
};

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateAvatar,
  verifyEmail,
  resentVerifyEmail,
};
