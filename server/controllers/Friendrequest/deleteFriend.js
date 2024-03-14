const User = require("../../models/user");

async function deleteFriend(req, res) {
  username = req.body.username;
  const user = await User.findOne({ username: username });
  const requestUser = await User.findOne({ _id: req.user._id });
  try {
    user.friends.pull(requestUser);
    requestUser.friends.pull(user);
    user.save();
    requestUser.save();
    res.json({ message: "Friend deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = deleteFriend;
