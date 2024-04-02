const Group = require("../../models/group");

async function groupsRoute(req, res) {
  try {
    const groups = await Group.find({
      members: { $in: req.user._id },
    }).populate("admin");

    if (!groups || groups.length === 0) {
      return res.status(404).json({ message: "No groups found" });
    }
    res.json(groups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = groupsRoute;
