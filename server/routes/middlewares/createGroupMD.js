const { body, validationResult } = require("express-validator");
const User = require("../../models/user");

module.exports = [
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string")
    .custom((value) => {
      const dangerousChars = /[\`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
      if (dangerousChars.test(value)) {
        throw new Error("name cannot contain especial characters");
      }

      return true;
    }),

  body("description").isString().withMessage("description must be a string"),
  body("members")
    .isArray()
    .withMessage("members must be an array")
    .customSanitizer((value) => {
      const uniqueMembers = new Set(value);
      return Array.from(uniqueMembers);
    })
    .custom(async (value) => {
      const dangerousChars = /[\`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
      const isDangerous = value.some((member) => dangerousChars.test(member));
      if (isDangerous) {
        throw new Error("members cannot contain especial characters");
      }
      const users = await User.find({ username: { $in: value } });

      if (users.length !== value.length) {
        throw new Error("members must be valid users");
      }
    }),
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
