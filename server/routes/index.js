const express = require("express");
const router = express.Router();
const allFriends = require("../controllers/index/allFriends");
const searchFriend = require("../controllers/index/searchFriend");
const groups = require("../controllers/index/groups");
const friendRequests = require("../controllers/index/friendRequests");
const searchFriendMiddleware = require("./middlewares/searchFriendMD");

router.get("/", (req, res) => {
  res.json({ message: "Hello from Alan!" });
});
router.get("/searchFriend", searchFriendMiddleware, searchFriend);
router.get("/friendRequests", friendRequests);
router.get("/groups", groups);
router.get("/allFriends", allFriends);

module.exports = router;
