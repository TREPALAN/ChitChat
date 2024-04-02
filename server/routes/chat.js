const express = require("express");
const router = express.Router();
const getGroup = require("../controllers/chat/GroupChat/getGroup");

router.get("/getGroup", getGroup);

module.exports = router;
