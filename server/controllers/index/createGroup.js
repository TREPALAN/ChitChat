const Group = require("../../models/group");
const GetUser = require("../../utils/GetUser");

const createGroup = async (req, res) => {
  const { name, description, members } = req.body;
  let membersToAdd = [];
  membersToAdd.push(req.user._id);

  //   Check if members exist
  await Promise.all(
    members.map(async (member) => {
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
    return res.json({ message: "Group created successfully", group });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = createGroup;
