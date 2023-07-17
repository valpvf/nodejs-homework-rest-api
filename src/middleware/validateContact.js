const { errorHandling } = require("../helpers");

const validateFavorite = (schema) => {
  const func = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ message: "missing field favorite" });
      return;
    }
    const { error } = schema.validate(req.keys);
    res.status(200);
    next(error.message);
  };
  return func;
};

const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ message: "missing fields" });
      return;
    }
    const { error } = schema.validate(req.body);
    if (error) {
      const fieldName = error.details[0].context.label;
      res
        .status(400)
        .json({ message: `missing required ${fieldName} field` });
      next(errorHandling(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = { validateBody, validateFavorite };
