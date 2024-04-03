const Group = require("../../../models/group");
const Message = require("../../../models/groupMessage");

const groupChat = async (req, res) => {
  const { groupId } = req.query;
  try {
    const group = await Group.findById(groupId).populate("admin members");
    const messages = await Message.find({
      group: groupId,
    }).sort({ name: 1 });

    res.json({ group, messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = groupChat;
