const express = require("express");
const router = express.Router();
const allFriends = require("../controllers/index/allFriends");
const searchFriend = require("../controllers/index/searchFriend");
const friendRequests = require("../controllers/index/friendRequests");
const searchFriendMiddleware = require("./middlewares/searchFriendMD");
const groups = require("../controllers/index/groups");
const searchGroups = require("../controllers/index/searchGoups");

router.get("/", (req, res) => {
  res.json({ message: "Hello from Alan!" });
});
router.get("/friendRequests", friendRequests);
router.get("/searchFriend", searchFriendMiddleware, searchFriend);
router.get("/groups", groups);
router.get("/searchGroups", searchGroups);

router.get("/allFriends", allFriends);

module.exports = router;
