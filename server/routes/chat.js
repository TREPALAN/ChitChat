const express = require("express");
const router = express.Router();
const groupChat = require("../controllers/chat/GroupChat/groupChat");
const getGroupMD = require("./middlewares/groupChatMD");
const loadPrivateMessages = require("../controllers/chat/PriivateChat/loadPrivateMessages");
const loadGroupMessages = require("../controllers/chat/GroupChat/loadGroupMessages");

router.get("/groupChat", getGroupMD, groupChat);
router.get("/loadGroupMessages", loadGroupMessages);
router.get("/loadPrivateMessages", loadPrivateMessages);

module.exports = router;
