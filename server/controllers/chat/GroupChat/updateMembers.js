const Group = require("../../../models/group");

async function updateMembers(req, res) {
  const { groupId, changes } = req.body;

  const group = await Group.findById(groupId);

  try {
    changes.forEach((change) => {
      if (change.action === "add") {
        group.members.push(change.member._id);
      } else if (change.action === "remove") {
        group.members.pull(change.member._id);
      }
    });

    await group.save();

    const updatedGroup = await Group.findById(groupId).populate(
      "requests members"
    );

    res.json({ updatedGroup, message: "success" });
  } catch (error) {
    console.log(error);
  }
}

module.exports = updateMembers;
