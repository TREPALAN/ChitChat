const Group = require("../../models/group");
const GetUser = require("../../utils/GetUser");

const createGroup = async (req, res) => {
  const { name, description, members } = req.body;
  let membersToAdd = [];
  membersToAdd.push(req.user._id);

  //   Check if members exist
  await Promise.all(
    members.map(async (member) => {
      if (member === req.user._id) {
        return;
      }
      const user = await GetUser(member, null, null);
      if (user) {
        membersToAdd.push(user._id.toString());
      }
      return user;
    })
  );

  const group = new Group({
    name,
    description,
    members: membersToAdd,
    admin: req.user._id,
  });

  try {
    await group.save();
    const groupData = await Group.findOne({ _id: group._id })
      .lean()
      .populate("admin");
    return res.json({
      message: "Group created successfully",
      group: groupData,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = createGroup;
