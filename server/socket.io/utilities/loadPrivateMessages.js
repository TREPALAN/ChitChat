const PrivateMessage = require("../../models/privateMessage");
const User = require("../../models/user");

module.exports = (socket, username) => {
  // Load private messages
  socket.on("loadPrivateMessages", async (receiver, callback) => {
    try {
      const user = await User.findOne({ username: username });
      const requestUser = await User.findOne({ username: receiver });
      const messages = await PrivateMessage.find({
        $or: [
          { sender: user._id, receiver: requestUser._id },
          { sender: requestUser._id, receiver: user._id },
        ],
      })
        .sort({ date: 1 })
        .populate("sender receiver");

      // Set messages as read
      messages.forEach((message) => {
        if (!message.isRead && message.receiver.username === username) {
          message.isRead = true;
          message.save();
        }
      });

      // case of success
      callback(messages);
    } catch (error) {
      console.log(error);
    }
  });
};
