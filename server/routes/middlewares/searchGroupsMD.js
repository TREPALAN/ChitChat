const { query, validationResult } = require("express-validator");
const Group = require("../../models/group");

module.exports = [
  query("groupName")
    .notEmpty()
    .escape()
    .isString()
    .withMessage("groupName is required")
    .custom(async (value) => {
      const group = await Group.findOne({ name: value });
      if (!group) {
        throw new Error("Group not found");
      }
    }),

  (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return next();
    }
    console.log(result.array());
    return res.status(400).json({
      message: result.array()[0].msg,
    });
  },
];
