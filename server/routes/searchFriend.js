const User = require("../models/user");

const searchFriendRoute = async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  console.log(user.id);
  res.json([
    {
      id: user.id,
      username: user.username,
      profilePicture: user.profilePicture,
    },
  ]);
};

module.exports = searchFriendRoute;
