const Group = require("../../models/group");

async function groupsRoute(req, res) {
  const groups = await Group.find({ members: { $in: req.user._id } });
  if (!groups || groups.length === 0) {
    return res.status(404).json({ message: "No groups found" });
  }
  res.json(groups);
}

module.exports = groupsRoute;
