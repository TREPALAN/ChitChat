const Group = require("../../models/groups");

async function groupsRoute(req, res) {
  const groups = await Group.find({ members: { $in: req.user._id } });
  if (!groups) {
    return res.status(404).json({ message: "No groups found" });
  }
  res.json(groups);
}

module.exports = groupsRoute;
