const express = require("express");
const router = express.Router();
const groupChat = require("../controllers/chat/GroupChat/groupChat");
const getGroupMD = require("./middlewares/groupChatMD");
const loadPrivateMessages = require("../controllers/chat/PriivateChat/loadPrivateMessages");
const loadGroupMessages = require("../controllers/chat/GroupChat/loadGroupMessages");
const editGroup = require("../controllers/chat/GroupChat/editGroup");
const editGroupMD = require("./middlewares/editGroupMD");
const requestToJoin = require("../controllers/chat/GroupChat/requestToJoin");
const deleteRequest = require("../controllers/chat/GroupChat/deleteRequest");
const updateMembers = require("../controllers/chat/GroupChat/updateMembers");

router.get("/groupChat", getGroupMD, groupChat);
router.put("/requestToJoin", requestToJoin);
router.put("/deleteGroupRequest", deleteRequest);
router.get("/loadGroupMessages", loadGroupMessages);
router.get("/loadPrivateMessages", loadPrivateMessages);
router.put("/editGroup", editGroupMD, editGroup);
router.put("/updateMembers", updateMembers);

module.exports = router;
