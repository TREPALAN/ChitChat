const User = require("../../models/user");
async function acceptFriend(req, res) {
  const { username, accept } = req.body;
  const user = await User.findOne({ username: username });
  const requestUser = await User.findOne({ _id: req.user._id });

  try {
    user.sentFriendRequests.pull(requestUser);
    requestUser.friendRequests.pull(user);

    if (accept) {
      user.friends.push(requestUser);
      requestUser.friends.push(user);
    }
    user.save();
    requestUser.save();

    res.json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = acceptFriend;
