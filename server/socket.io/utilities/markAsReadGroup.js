const GroupMessage = require("../../models/groupMessage");

async function markAsReadGroup(socket, _id, receiver, onlineUsers) {
  // Mark as read
  try {
    const group = await GroupMessage.findById(_id);

    group.readBy.push(receiver);

    await group.save();
  } catch (error) {
    console.log(error);
  }
}

module.exports = markAsReadGroup;
