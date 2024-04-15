const Group = require("../../models/group");
const User = require("../../models/user");
const { body, validationResult } = require("express-validator");

module.exports = [
  body("changes")
    .notEmpty()
    .isArray()
    .withMessage("member must be an array")
    .custom(async (value) => {
      value.forEach(async (change) => {
        const member = await User.findById(change.member._id);
        if (!member) {
          throw new Error("member not found");
        }
      });

      return true;
    }),
  body("groupId")
    .notEmpty()
    .escape()
    .isString()
    .withMessage("groupId is required")
    .custom(async (value) => {
      const group = await Group.findById(value);
      if (!group) {
        throw new Error("Group not found");
      }
      return true;
    }),

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
