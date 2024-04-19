const PrivateMessages = require("../../models/privateMessage");
const Group = require("../../models/group");
const GroupMessages = require("../../models/groupMessage");
const getUser = require("../../utils/GetUser");

async function home(req, res) {
  const userId = req.user._id;
  try {
    const allnewPrivateMessages = await PrivateMessages.find({
      receiver: userId,
      isRead: false,
    })
      .sort({ date: -1 })
      .select("message sender date");

    // Join messages with the same sender
    const newPrivateMessages = [];

    const senderIds = new Set(
      allnewPrivateMessages.map((message) => message.sender._id.toString())
    );

    senderIds.forEach((senderId) => {
      const senderObj = {
        sender: null,
        messages: [],
      };

      (async () => {
        try {
          senderObj.sender = await getUser(null, senderId, null);

          for (message of allnewPrivateMessages) {
            if (senderObj.messages.length >= 5) {
              break;
            }

            if (message.sender._id.toString() === senderId) {
              senderObj.messages.push({
                _id: message._id,
                date: message.dateFormatted,
                message: message.message,
              });
            }
          }

          newPrivateMessages.push(senderObj);
        } catch (error) {
          console.log(error);
        }
      })();
    });

    const userGroups = await Group.find({ members: userId });

    const newGroupMessages = [];

    for (let group of userGroups) {
      try {
        const groupMessages = await GroupMessages.find({
          group: group._id,
        })
          .sort({ date: -1 })
          .select("message sender date")
          .populate("sender")
          .limit(5);

        let Messages = groupMessages.map((message) => {
          return {
            _id: message._id,
            date: message.dateFormatted,
            message: message.message,
            sender: message.sender,
          };
        });

        newGroupMessages.push({
          group: { _id: group._id.toString(), name: group.name },
          messages: Messages,
        });
      } catch (error) {
        console.log(error);
      }
    }

    return res.json({
      privateMessages: newPrivateMessages,
      groupMessages: newGroupMessages,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = home;
