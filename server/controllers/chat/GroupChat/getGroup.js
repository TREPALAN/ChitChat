const Group = require("../../../models/group");
const getGroup = async (req, res) => {
  const { groupId } = req.query;
  // TODO: Check if group exists and if requested user is a member, in the middlware
  try {
    const group = await Group.findById(groupId).populate("admin members");

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getGroup;
