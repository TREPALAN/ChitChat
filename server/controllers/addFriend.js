const User = require("../models/user");

async function addFriendRoute(req, res) {
  const { username } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.friends.includes(req.user._id)) {
    user.friends = user.friends.filter((friend) => friend !== req.user._id);
  } else {
    user.friends.push(req.user._id);
  }
  await user.save();

  res.json({ message: "success" });
}

module.exports = addFriendRoute;
