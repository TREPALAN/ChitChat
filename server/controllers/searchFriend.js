const User = require("../models/user");

const searchFriendRoute = async (req, res) => {
  username = req.query.username;
  const users = await User.find({
    username: { $regex: username, $options: "i" },
  }).select("_id username profilePicture friends");

  if (!users || users.length === 0) {
    return res.status(404).json({ message: "No users found" });
  }

  // Check if user is already friends
  const currentUser = req.user._id;

  const usersWithFriendStatus = await Promise.all(
    users.map(async (user) => {
      const isFriend = user.friends.includes(currentUser);
      return {
        ...user.toObject(),
        isFriend,
      };
    })
  );

  res.json(usersWithFriendStatus);
};

module.exports = searchFriendRoute;
