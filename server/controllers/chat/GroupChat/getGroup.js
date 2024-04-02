const Group = require("../../../models/group");
const getGroup = async (req, res) => {
  const { groupId } = req.query;
  try {
    const group = await Group.findById(groupId).populate("admin members");

    res.json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getGroup;
