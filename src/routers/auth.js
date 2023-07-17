const express = require("express");

const { schemas } = require("../model/user");
const { validateBody } = require("../middleware/validateContact");
const {
  register,
  login,
  logout,
  getCurrent,
} = require("../controllers/auth.controller");
const isValidUser = require("../middleware/isValidUser");
const authMiddleware = require("../middleware/auth");
const { contrWrapper } = require("../helpers/contrWrapper");

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
router.get("/current", authMiddleware, contrWrapper(getCurrent));

module.exports = router;
