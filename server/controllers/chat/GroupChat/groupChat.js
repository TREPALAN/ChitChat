const Group = require("../../../models/group");
const Message = require("../../../models/groupMessage");

const groupChat = async (req, res) => {
  const { groupId, paginatePerPage } = req.query;
  try {
    const group = await Group.findById(groupId).populate("requests members");

    const members = group.members.map((member) => member._id.toString());
    if (!members.includes(req.user._id)) {
      const requests = group.requests.map((request) => request._id.toString());
      let requested = false;
      if (requests.includes(req.user._id)) {
        requested = true;
      }
      return res.json({
        code: 400,
        message: "You are not in this group",
        requested,
      });
    }

    const isAdmin = group.admin.includes(req.user._id);

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

    res.json({ group, messages: messages.reverse(), totalpages, isAdmin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = groupChat;
