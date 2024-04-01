const express = require("express");
const router = express.Router();
const allFriends = require("../controllers/index/allFriends");
const searchFriend = require("../controllers/index/searchFriend");
const friendRequests = require("../controllers/index/friendRequests");
const searchFriendMiddleware = require("./middlewares/searchFriendMD");
const myGroups = require("../controllers/index/myGroups");
const searchGroups = require("../controllers/index/searchGoups");
const searchGroupsMiddleware = require("./middlewares/searchGroupsMD");
const creteGroup = require("../controllers/index/createGroup");
const createGroupMiddleware = require("./middlewares/createGroupMD");

router.get("/", (req, res) => {
  res.json({ message: "Hello from Alan!" });
});
router.get("/friendRequests", friendRequests);
router.get("/searchFriend", searchFriendMiddleware, searchFriend);
router.get("/myGroups", myGroups);
router.post("/createGroup", createGroupMiddleware, creteGroup);
router.get("/searchGroups", searchGroupsMiddleware, searchGroups);

router.get("/allFriends", allFriends);

module.exports = router;
