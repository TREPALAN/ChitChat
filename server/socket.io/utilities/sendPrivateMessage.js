const PrivateMessage = require("../../models/privateMessage");
const User = require("../../models/user");

async function sendPrivateMessage(
  socket,
  username,
  receiver,
  onlineUsers,
  message
) {
  // Send private message to  receiver socket if online
  if (onlineUsers.some((u) => u.username === receiver)) {
    socket
      .to(onlineUsers.find((u) => u.username === receiver).id)
      .emit("receivePrivateMessage", message, username);
  }

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
    return newMessage;
  } catch (error) {
    console.log(error);
  }
}

module.exports = sendPrivateMessage;
