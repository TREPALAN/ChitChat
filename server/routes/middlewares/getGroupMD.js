const { query, validationResult } = require("express-validator");
const Group = require("../../models/group");

module.exports = [
  query("groupId")
    .notEmpty()
    .escape()
    .isString()
    .withMessage("groupId is required")
    .custom(async (value) => {
      const group = await Group.findById(value);
      if (!group) {
        throw new Error("Group not found");
      }
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
