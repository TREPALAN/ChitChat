const PrivateMessage = require("../../../models/privateMessage");
const User = require("../../../models/user");
const dateFormat = require("../../../utils/dateFormate");

async function loadPrivateMessages(req, res) {
  const { username, currentPage, paginatePerPage } = req.query;
  const requestUserusername = req.user.username;
  const requestUserId = req.user._id;

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
      .skip(currentPage * paginatePerPage) // 10 messages per page
      .limit(paginatePerPage)
      .populate("sender receiver")
      .exec();

    // Get total pages (executed only once)
    let totalpages;
    if (currentPage == 0) {
      const count = await PrivateMessage.countDocuments({
        $or: [
          { sender: user._id, receiver: requestUser._id },
          { sender: requestUser._id, receiver: user._id },
        ],
      });
      totalpages = Math.ceil(count / paginatePerPage);
    }

    // mark as received
    messages.forEach((message) => {
      if (
        !message.isReceived &&
        message.receiver._id.toString() === requestUserId.toString()
      ) {
        message.isReceived = true;
        message.save();
      }
    });

    // Format date
    messagesWithFormattedDate = dateFormat(messages);

    //////////// case of success////////////
    res.json({ messages: messagesWithFormattedDate.reverse(), totalpages });

    /////////// case of error /////////////
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = loadPrivateMessages;
