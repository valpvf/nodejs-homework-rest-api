const jwt = require("jsonwebtoken");
require("dotenv").config();

const payload = { id: "dfghjkl;" };
const SEKRET_KEY = process.env;

const token = jwt.sign(payload, SEKRET_KEY, { expiresIn: "23h" });

const decodeToken = jwt.decode(token);
