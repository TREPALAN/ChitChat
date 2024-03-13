const express = require("express");
const router = express.Router();
const sendRequest = require("../controllers/Friendrequest/sendRequest");
const acceptFriend = require("../controllers/Friendrequest/acceptFriend");
const deleteFriend = require("../controllers/Friendrequest/deleteFriend");
const sendRequestMiddleware = require("./middlewares/sendRequestMD");

router.post("/sendRequest", sendRequestMiddleware, sendRequest);
router.post("/acceptFriend", acceptFriend);
router.post("/deleteFriend", deleteFriend);

module.exports = router;
