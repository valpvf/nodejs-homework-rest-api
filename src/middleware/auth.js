const jwt = require("jsonwebtoken");

const { User } = require("../model/user");
const { errorHandling } = require("../helpers");

const { SECRET_KEY } = process.env;

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization = " " } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw errorHandling(
        401,
        `{
        message: "Not authorized"
      }`
      );
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      throw errorHandling(401);
    }
    req.user = user;
    next();
  } catch (error) {
    next(
      res.status(401).json({
        message: "Not authorized",
      })
    );
  }
};

module.exports = authMiddleware;
