const User = require("../../models/user");
const CheckFriend = require("../../utils/CheckFriend");

const searchUserRoute = async (req, res) => {
  username = req.query.username;
  const users = await User.find({
    username: { $regex: username, $options: "i" },
  })
    .select("_id username profilePicture friends")
    .limit(40);

  if (!users || users.length === 0) {
    return res.status(404).json({ message: "No users found" });
  }
  // check each user if they are already friends
  const usersWithFriendStatus = await CheckFriend(req, res, users);

  res.json(usersWithFriendStatus);
};

module.exports = searchUserRoute;
