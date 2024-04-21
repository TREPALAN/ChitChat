const PrivateMessage = require("../../models/privateMessage");
const User = require("../../models/user");
const dateFormat = require("../../utils/dateFormate");

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
    const Mmessage = await PrivateMessage.findById(newMessage._id).populate(
      "sender receiver"
    );

    // Format date
    const populatedMessage = dateFormat([Mmessage])[0];

    // Send private message to  all of the receiver secions
    let isReceived = false;
    if (onlineUsers.some((u) => u.username === receiver)) {
      isReceived = true;
      const receiverSockets = onlineUsers.filter(
        (u) => u.username === receiver
      );
      receiverSockets.forEach((receiverSocket) => {
        socket
          .to(receiverSocket.id)
          .emit("receivePrivateMessage", populatedMessage, username);
      });
    }

    // mark as received
    if (isReceived) {
      populatedMessage.isReceived = true;
      message.isReceived = true;
      await Mmessage.save();
    }
    // case of success
    return populatedMessage;
  } catch (error) {
    console.log(error);
  }
}

module.exports = sendPrivateMessage;
