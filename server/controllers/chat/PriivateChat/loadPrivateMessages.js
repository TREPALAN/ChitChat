const PrivateMessage = require("../../../models/privateMessage");
const User = require("../../../models/user");

async function loadPrivateMessages(req, res) {
  const { username, page } = req.query;
  const requestUserusername = req.user.username;

  try {
    const user = await User.findOne({ username: username });
    const requestUser = await User.findOne({ username: requestUserusername });
    const messages = await PrivateMessage.find({
      $or: [
        { sender: user._id, receiver: requestUser._id },
        { sender: requestUser._id, receiver: user._id },
      ],
    })
      .sort({ date: -1 })
      .skip(page * 10) // 10 messages per page
      .limit(10)
      .exec();

    // case of success
    res.json({ messages });

    // case of error
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = loadPrivateMessages;
