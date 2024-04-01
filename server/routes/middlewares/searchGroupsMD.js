const { query, validationResult } = require("express-validator");

module.exports = [
  query("groupName")
    .notEmpty()
    .escape()
    .isString()
    .withMessage("groupName is required"),
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
