const Group = require("../../../models/group");

async function requestToJoin(req, res) {
  // Add or remove user from requests
  const { groupId } = req.body;
  const userId = req.user._id;

  try {
    const group = await Group.findById(groupId);
    if (!group.requests.includes(userId)) {
      group.requests.push(userId);
    } else {
      group.requests.pull(userId);
    }
    await group.save();

    res.json({ message: "Request sent successfully" });
  } catch (error) {
    console.log(error);
  }
}

module.exports = requestToJoin;
