const { body, validationResult } = require("express-validator");
const User = require("../../models/user");
const Group = require("../../models/group");

module.exports = [
  body("group._id")
    .notEmpty()
    .withMessage("group id is required")
    .isString()
    .withMessage("group id must be a string")
    .custom(async (value) => {
      const group = await Group.findById(value);
      if (!group) {
        throw new Error("group not found");
      }
      return true;
    }),

  body("group.name")
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

  body("group.description")
    .isString()
    .withMessage("description must be a string"),
  body("group.admin")
    .isArray()
    .withMessage("admin must be an array")
    .customSanitizer((value) => {
      const uniqueAdmins = new Set(value);
      return Array.from(uniqueAdmins);
    })
    .custom(async (value) => {
      const dangerousChars = /[\`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
      const isDangerous = value.some((admin) => dangerousChars.test(admin));
      if (isDangerous) {
        throw new Error("admin cannot contain especial characters");
      }
      const users = await User.find({ username: { $in: value } });
    }),
  body("group.admin.*")
    .isString()
    .withMessage("admin must be an array of strings"),

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
