const isValidUser = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(
      res.status(400).json({ message: `email / password is empty` })
    );
  }
  next();
};

module.exports = isValidUser;
