const User = require("../../models/user");

function deleteFriend(req, res) {
  username = req.body.username;

  try {
    User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { friends: { username: username } } }
    );
    res.json({ message: "Friend deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = deleteFriend;
