const GroupMessage = require("../../models/groupMessage");
const User = require("../../models/user");
const dateFormat = require("../../utils/dateFormate");

async function sendGroupMessage(socket, username, group, message) {
  // Save group message in database
  try {
    const user = await User.findOne({ username: username });
    const newMessage = new GroupMessage({
      message,
      sender: user._id,
      group: group._id,
    });
    await newMessage.save();

    // Populate the sender and group fields
    const populatedMessage = await GroupMessage.findById(
      newMessage._id
    ).populate("sender");

    // Format date
    const formattedMessages = dateFormat([populatedMessage])[0];
    // Send the goup room
    socket
      .to(group._id)
      .emit("receiveGroupMessage" + group._id, formattedMessages, username);

    return formattedMessages;
  } catch (error) {
    console.log(error);
  }
}

module.exports = sendGroupMessage;
