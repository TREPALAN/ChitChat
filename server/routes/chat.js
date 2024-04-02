const express = require("express");
const router = express.Router();
const getGroup = require("../controllers/chat/GroupChat/getGroup");
const getGroupMD = require("./middlewares/getGroupMD");
router.get("/getGroup", getGroupMD, getGroup);

module.exports = router;
