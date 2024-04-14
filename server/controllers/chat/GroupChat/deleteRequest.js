const Group = require("../../../models/group");

async function deleteRequest(req, res) {
  // Add or remove user from requests
  const { userId, groupId } = req.body;
  try {
    await Group.findOneAndUpdate(
      { _id: groupId },
      { $pull: { requests: userId } }
    );
    res.json({ message: "Request deleted successfully" });
  } catch (error) {
    console.log(error);
  }
}

module.exports = deleteRequest;
