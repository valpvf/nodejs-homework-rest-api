const express = require("express");
const { validateBody } = require("../middleware/validateContact");
const { model } = require("mongoose");
const { User } = require("../model/user");
const { schemas } = require("../model/user");
const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema));

module.exports = router;
