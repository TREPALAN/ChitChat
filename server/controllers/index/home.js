const PrivateMessages = require("../../models/privateMessage");
const Group = require("../../models/group");
const GroupMessages = require("../../models/groupMessage");

async function home(req, res) {
  const userId = req.user._id;
  try {
    const newPrivateMessages = await PrivateMessages.find({
      receiver: userId,
      isRead: false,
    });

    const userGroups = await Group.find({ members: userId });

    const newGroupMessages = [];

    for (let i = 0; i < userGroups.length; i++) {
      const group = userGroups[i];
      const groupMessages = await GroupMessages.find({
        group: group._id,
        readBy: { $nin: [userId] },
      });
      newGroupMessages.push(...groupMessages);
    }

    const newMessages = [...newPrivateMessages, ...newGroupMessages];
    const sortedMessages = newMessages.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    return res.json({ messages: sortedMessages });
  } catch (error) {
    console.log(error);
  }
}

module.exports = home;
