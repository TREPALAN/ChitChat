const express = require("express");
const router = express.Router();
const allFriends = require("../controllers/index/allFriends");
const home = require("../controllers/index/home");
const searchUserRoute = require("../controllers/index/searchUser");
const searchUserMD = require("./middlewares/searchUserMD");
const friendRequests = require("../controllers/index/friendRequests");
const myGroups = require("../controllers/index/myGroups");
const searchGroups = require("../controllers/index/searchGoups");
const searchGroupsMiddleware = require("./middlewares/searchGroupsMD");
const creteGroup = require("../controllers/index/createGroup");
const createGroupMiddleware = require("./middlewares/createGroupMD");

router.get("/", home);
router.get("/friendRequests", friendRequests);
router.get("/searchUser", searchUserMD, searchUserRoute);
router.get("/myGroups", myGroups);
router.post("/createGroup", createGroupMiddleware, creteGroup);
router.get("/searchGroups", searchGroupsMiddleware, searchGroups);

router.get("/allFriends", allFriends);

module.exports = router;
