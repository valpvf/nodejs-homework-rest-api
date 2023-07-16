const isValidUser = (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    next(
      res.status(400).json({ message: `email / password is empty` })
    );
  }
  // else if (d) {
  //   next(
  //     res
  //       .status(400)
  //       .json({ message: `${password} is not valid ` })
  //   );
  // }
  next();
};

module.exports = isValidUser;
