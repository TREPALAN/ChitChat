const User = require("../models/user");
async function CheckFriend(req, res, users) {
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
  return usersWithFriendStatus;
}

module.exports = CheckFriend;
