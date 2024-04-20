const User = require("../../models/user");
const CheckFriend = require("../../utils/CheckFriend");
async function friendRequests(req, res) {
  const user = await User.findById(req.user._id)
    .select("friendRequests")
    .populate("friendRequests");
  if (!user || user.friendRequests.length === 0) {
    return res.status(404).json({ message: "You have no friend requests" });
  }
  const friends = await CheckFriend(req, res, user.friendRequests);
  return res.json(friends);
}

module.exports = friendRequests;
