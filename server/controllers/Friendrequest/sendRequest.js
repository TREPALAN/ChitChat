const User = require("../../models/user");

async function sendRequest(req, res) {
  const { username } = req.body;

  const user = await User.findOne({ username });
  const requestUser = await User.findOne({ _id: req.user._id });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    if (requestUser.friends.includes(user._id)) {
      // Already friends so remove them
      user.friends.pull(requestUser);
      requestUser.friends.pull(user);
    } else {
      // If not friends
      if (requestUser.sentFriendRequests.includes(user._id)) {
        // If already sent a friend request remove it
        requestUser.sentFriendRequests.pull(user);
        user.friendRequests.pull(requestUser);
      } else {
        // Otherwise add them both to the friend requests
        user.friendRequests.push(requestUser);
        requestUser.sentFriendRequests.push(user);
      }
    }
    // Save the users
    user.save();
    requestUser.save();
  } catch (error) {
    // Something went wrong
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }

  res.json({ message: "success" });
}

module.exports = sendRequest;
