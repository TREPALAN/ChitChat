const express = require("express");
const router = express.Router();
const groupChat = require("../controllers/chat/GroupChat/groupChat");
const getGroupMD = require("./middlewares/groupChatMD");
const loadPrivateMessages = require("../controllers/chat/PriivateChat/loadPrivateMessages");
const loadGroupMessages = require("../controllers/chat/GroupChat/loadGroupMessages");
const editGroup = require("../controllers/chat/GroupChat/editGroup");
const editGroupMD = require("./middlewares/editGroupMD");

router.get("/groupChat", getGroupMD, groupChat);
router.get("/loadGroupMessages", loadGroupMessages);
router.get("/loadPrivateMessages", loadPrivateMessages);
router.put("/editGroup", editGroupMD, editGroup);

module.exports = router;
