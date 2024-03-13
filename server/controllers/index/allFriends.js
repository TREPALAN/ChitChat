const User = require("../../models/user");
async function allFriendsRoute(req, res) {
  const user = await User.findOne({ _id: req.user._id }).populate("friends");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const friends = user.friends.map((friend) => {
    return {
      _id: friend._id,
      username: friend.username,
      profilePicture: friend.profilePicture,
      isFriend: true,
    };
  });
  if (!friends) {
    return res.status(404).json({ message: "No friends found" });
  }

  res.json(friends);
}

module.exports = allFriendsRoute;
