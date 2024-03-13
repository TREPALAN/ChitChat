const { body, validationResult } = require("express-validator");

module.exports = [
  body("username")
    .notEmpty()
    .escape()
    .isString()
    .withMessage("username is required"),

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
