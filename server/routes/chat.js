const express = require("express");
const router = express.Router();
const groupChat = require("../controllers/chat/GroupChat/groupChat");
const getGroupMD = require("./middlewares/groupChatMD");
const loadPrivateMessages = require("../controllers/chat/PriivateChat/loadPrivateMessages");

router.get("/groupChat", getGroupMD, groupChat);
router.get("/loadPrivateMessages", loadPrivateMessages);

module.exports = router;
