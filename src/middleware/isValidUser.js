const { isValidObjectId } = require("mongoose");

const isValidUser = (req, res, next) => {
  const { email, password } = req.params;
  if (!isValidObjectId(email)) {
    next(
      res.status(400).json({ message: `${email} is not valid email` })
    );
  } else if (!isValidObjectId(password)) {
    next(
      res
        .status(400)
        .json({ message: `${password} is not valid password` })
    );
  }
  next();
};

module.exports = isValidUser;
