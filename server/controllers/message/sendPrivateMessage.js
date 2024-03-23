const PrivateMessage = require("../../models/privateMessage");
const User = require("../../models/user");

async function sendPrivateMessage(req, res) {
  const { receiver, message } = req.body;
  const sender = req.user.username;
  try {
    const senderUser = await User.findOne({ username: sender });
    const receiverUser = await User.findOne({ username: receiver });

    const newMessage = new PrivateMessage({
      sender: senderUser,
      receiver: receiverUser,
      message,
    });
    await newMessage.save();
    res.json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = sendPrivateMessage;
