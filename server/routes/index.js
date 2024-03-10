const express = require("express");
const router = express.Router();
const searchFriend = require("../controllers/searchFriend");
const allFriends = require("../controllers/allFriends");
const searchFriendMiddleware = require("./middlewares/searchFriendMD");

router.get("/", (req, res) => {
  res.json({ message: "Hello from Alan!" });
});

router.get("/searchFriend", searchFriendMiddleware, searchFriend);

router.get("/allFriends", allFriends);

module.exports = router;
