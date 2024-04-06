const groupMessage = require("../../../models/groupMessage");

async function loadGroupMessages(req, res) {
  const { groupId, page, paginatePerPage } = req.query;

  try {
    const messages = await groupMessage
      .find({ group: groupId })
      .sort({ date: -1 })
      .skip(page * paginatePerPage) // 10 messages per page
      .limit(paginatePerPage)
      .exec();

    res.json({ messages, paginatePerPage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
