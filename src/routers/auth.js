const express = require("express");
const { validateBody } = require("../middleware/validateContact");
const { schemas } = require("../model/user");
const {
  register,
  login,
  logout,
} = require("../controllers/auth.controller");
const { contrWrapper } = require("../helpers/contrWrapper");
const isValidUser = require("../middleware/isValidUser");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post(
  "/register",
  isValidUser,
  validateBody(schemas.registerSchema),
  contrWrapper(register)
);
router.post(
  "/login",
  isValidUser,
  validateBody(schemas.loginSchema),
  contrWrapper(login)
);
router.post("/logout", authMiddleware, contrWrapper(logout));

module.exports = router;
