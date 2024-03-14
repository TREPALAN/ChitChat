const User = require("../../models/user");

const searchFriendRoute = async (req, res) => {
  username = req.query.username;
  const users = await User.find({
    username: { $regex: username, $options: "i" },
  }).select("_id username profilePicture friends");

  if (!users || users.length === 0) {
    return res.status(404).json({ message: "No users found" });
  }

  // Check if user is already friends
  const currentUser = await User.findById(req.user._id);

  const usersWithFriendStatus = await Promise.all(
    users.map(async (user) => {
      // Check if user is the same as the current user
      if (user._id.toString() === currentUser._id.toString()) {
        return {
          ...user.toObject(),
          isFriend: true,
          isRequestSent: false,
        };
      }

      const isFriend = user.friends.includes(currentUser._id);
      const isRequestSent = currentUser.sentFriendRequests.includes(user._id);
      const isRequestReceived = currentUser.friendRequests.includes(user._id);
      return {
        ...user.toObject(),
        isFriend,
        isRequestSent,
        isRequestReceived,
      };
    })
  );

  res.json(usersWithFriendStatus);
};

module.exports = searchFriendRoute;
