const express = require("express");
const router = express.Router();
const sendMessage = require("../controllers/message/sendMessage");
const deleteMessage = require("../controllers/message/deleteMessage");
const loadMessages = require("../controllers/message/loadMessages.js");

router.post("/sendMessage", sendMessage);
router.post("/deleteMessage", deleteMessage);
router.get("/loadMessages", loadMessages);

module.exports = router;
