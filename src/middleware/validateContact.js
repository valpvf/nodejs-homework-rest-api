const validateContact = (schema) => {
  const func = (req, res, next) => {
    console.log("req.body", req.body);
    if (Object.keys(req.body).length === 0) {
      res.status(400, "missing fields");
      return func;
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
