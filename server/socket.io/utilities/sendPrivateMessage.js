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

    // Populate the sender and receiver fields
    const populatedMessage = await PrivateMessage.findById(
      newMessage._id
    ).populate("sender receiver");

    // Send private message to  all of the receiver secions
    if (onlineUsers.some((u) => u.username === receiver)) {
      const receiverSockets = onlineUsers.filter(
        (u) => u.username === receiver
      );
      receiverSockets.forEach((receiverSocket) => {
        socket
          .to(receiverSocket.id)
          .emit("receivePrivateMessage", populatedMessage);
      });
    }
    // case of success
    return populatedMessage;
  } catch (error) {
    console.log(error);
  }
}

module.exports = sendPrivateMessage;
