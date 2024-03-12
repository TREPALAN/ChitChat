const express = require("express");
const router = express.Router();
const addFriend = require("../controllers/addFriend");
const allFriends = require("../controllers/allFriends");
const searchFriend = require("../controllers/searchFriend");
const searchFriendMiddleware = require("./middlewares/searchFriendMD");
const addFriendMiddleware = require("./middlewares/addFriendMD");

router.get("/", (req, res) => {
  res.json({ message: "Hello from Alan!" });
});

router.get("/searchFriend", searchFriendMiddleware, searchFriend);
router.post("/addFriend", addFriendMiddleware, addFriend);
router.get("/allFriends", allFriends);

module.exports = router;
