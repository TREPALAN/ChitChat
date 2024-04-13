const Group = require("../../../models/group");

async function editGroup(req, res) {
  const { group } = req.body;
  try {
    await Group.findByIdAndUpdate(group._id, {
      name: group.name,
      description: group.description,
      admin: group.admin,
    });
    res.json({ message: "Group updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = editGroup;
