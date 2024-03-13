const express = require("express");
const router = express.Router();
const allFriends = require("../controllers/index/allFriends");
const searchFriend = require("../controllers/index/searchFriend");
const searchFriendMiddleware = require("./middlewares/searchFriendMD");

router.get("/", (req, res) => {
  res.json({ message: "Hello from Alan!" });
});
router.get("/searchFriend", searchFriendMiddleware, searchFriend);
router.get("/allFriends", allFriends);

module.exports = router;
