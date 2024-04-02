const Group = require("../../models/group");

const searchGroupsRoute = async (req, res) => {
  const groupName = req.query.groupName;
  const groups = await Group.find({
    name: { $regex: groupName, $options: "i" },
  })
    .populate("admin")
    .limit(40);
  if (!groups || groups.length === 0) {
    return res.status(404).json({ message: "No group found" });
  }
  res.json(groups);
};

module.exports = searchGroupsRoute;
