const { body, validationResult } = require("express-validator");

module.exports = [
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .escape()
    .isString()
    .withMessage("name must be a string"),
  body("description")
    .escape()
    .isString()
    .withMessage("description must be a string"),
  body("members").isArray().withMessage("members must be an array"),
  body("members.*")
    .isString()
    .withMessage("members must be an array of strings"),

  (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return next();
    }
    return res.status(400).json({
      message: result.array()[0].msg,
    });
  },
];
