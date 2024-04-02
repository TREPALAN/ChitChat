const User = require("../../models/user");
const CheckFriend = require("../../utils/CheckFriend");
async function allFriendsRoute(req, res) {
  const users = await User.findOne({ _id: req.user._id }).populate("friends");
  if (!users) {
    return res.status(404).json({ message: "User not found" });
  }

  const friends = await CheckFriend(req, res, users.friends);
  if (!friends) {
    return res.status(404).json({ message: "No friends found" });
  }
  res.json(friends);
}

module.exports = allFriendsRoute;
