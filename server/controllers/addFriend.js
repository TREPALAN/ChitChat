const User = require("../models/user");

async function addFriendRoute(req, res) {
  const { username } = req.body;

  const user = await User.findOne({ username });
  const requestUser = await User.findOne({ _id: req.user._id });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    if (requestUser.friends.includes(user._id)) {
      user.friends.pull(requestUser);
      requestUser.friends.pull(user);
    } else {
      user.friends.push(requestUser);
      requestUser.friends.push(user);
    }
    user.save();
    requestUser.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }

  res.json({ message: "success" });
}

module.exports = addFriendRoute;
