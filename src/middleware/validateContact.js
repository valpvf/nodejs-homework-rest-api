const validateContact = (schema) => {
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
    }
    next();
  };
  return func;
};

module.exports = { validateContact };
