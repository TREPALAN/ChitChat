const { body, validationResult } = require("express-validator");
const User = require("../../models/user");

module.exports = [
  body("username")
    .notEmpty()
    .escape()
    .isString()
    .withMessage("username is required")
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (!user) {
        throw new Error("User not found");
      }
    }),
  body("password").notEmpty(),
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
