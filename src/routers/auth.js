const express = require("express");
const { validateBody } = require("../middleware/validateContact");
const { schemas } = require("../model/user");
const { register } = require("../controllers/auth.controller");
const { contrWrapper } = require("../helpers/contrWrapper");
const isValidUser = require("../middleware/isValidUser");

const router = express.Router();

router.post(
  "/register",
  isValidUser,
  validateBody(schemas.registerSchema),
  contrWrapper(register)
);

module.exports = router;
