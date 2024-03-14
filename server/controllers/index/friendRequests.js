const User = require("../../models/user");
const CheckFriend = require("../../utils/CheckFriend");
async function friendRequests(req, res) {
  const user = await User.findById(req.user._id).populate("friendRequests");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const friends = await CheckFriend(req, res, user.friendRequests);
  return res.json(friends);
}

module.exports = friendRequests;
