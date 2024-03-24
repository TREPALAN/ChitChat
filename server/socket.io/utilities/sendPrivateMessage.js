const PrivateMessage = require("../../models/privateMessage");
const User = require("../../models/user");

async function sendPrivateMessage(
  socket,
  username,
  receiver,
  onlineUsers,
  message
) {
  // Save private message in database
  try {
    const user = await User.findOne({ username: username });
    const requestUser = await User.findOne({ username: receiver });
    const newMessage = new PrivateMessage({
      message,
      sender: user._id,
      receiver: requestUser._id,
    });
    await newMessage.save();

    // Send private message to  all of the receiver secions
    if (onlineUsers.some((u) => u.username === receiver)) {
      const receiverSockets = onlineUsers.filter(
        (u) => u.username === receiver
      );
      receiverSockets.forEach((receiverSocket) => {
        socket.to(receiverSocket.id).emit("receivePrivateMessage", newMessage);
      });
    }
    // case of success
    return newMessage;
  } catch (error) {
    console.log(error);
  }
}

module.exports = sendPrivateMessage;
