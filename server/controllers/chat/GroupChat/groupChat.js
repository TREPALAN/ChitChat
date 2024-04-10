const Group = require("../../../models/group");
const Message = require("../../../models/groupMessage");

const groupChat = async (req, res) => {
  const { groupId, paginatePerPage } = req.query;
  try {
    const group = await Group.findById(groupId).populate("admin members");
    const messages = await Message.find({
      group: groupId,
    })
      .sort({ date: -1 })
      .limit(paginatePerPage)
      .populate("sender")
      .exec();

    // Get total pages
    const count = await Message.countDocuments({ group: groupId });
    const totalpages = Math.ceil(count / paginatePerPage);

    res.json({ group, messages: messages.reverse(), totalpages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = groupChat;
