const express = require("express");
const router = express.Router();
const login = require("../controllers/login");
const register = require("../controllers/register");
const refresh = require("../controllers/refresh");

router.post("/login", login);
router.post("/register", register);
router.post("/refresh", refresh);

module.exports = router;
