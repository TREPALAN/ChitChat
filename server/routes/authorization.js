const express = require("express");
const router = express.Router();
const login = require("../controllers/login");
const register = require("../controllers/register");
const refresh = require("../controllers/refresh");
const loginMiddleware = require("./middlewares/loginMD");
const registerMiddleware = require("./middlewares/registerMD");

router.post("/login", loginMiddleware, login);
router.post("/register", registerMiddleware, register);
router.post("/refresh", refresh);

module.exports = router;
