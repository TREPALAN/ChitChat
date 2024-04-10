const groupMessage = require("../../../models/groupMessage");

async function loadGroupMessages(req, res) {
  const { groupId, page, paginatePerPage } = req.query;

  try {
    const messages = await groupMessage
      .find({ group: groupId })
      .sort({ date: -1 })
      .skip(page * paginatePerPage) // 10 messages per page
      .populate("sender")
      .limit(paginatePerPage)
      .exec();

    res.json({ messages: messages.reverse(), paginatePerPage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = loadGroupMessages;
