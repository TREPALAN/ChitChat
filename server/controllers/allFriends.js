const User = require("../models/user");
async function allFriendsRoute(req, res) {
  const username = req.user.username;
  const friends = await User.find({ username: username })
    .select("friends")
    .populate("friends")
    .exec();
  if (!friends || friends.length === 1) {
    return res.status(404).json({ message: "You have no friends" });
  }
  res.json(friends);
}

module.exports = allFriendsRoute;
