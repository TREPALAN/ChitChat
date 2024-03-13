const express = require("express");
const router = express.Router();
const login = require("../controllers/auth/login");
const register = require("../controllers/auth/register");
const refresh = require("../controllers/auth/refresh");
const loginMiddleware = require("./middlewares/loginMD");
const registerMiddleware = require("./middlewares/registerMD");

router.post("/login", loginMiddleware, login);
router.post("/register", registerMiddleware, register);
router.post("/refresh", refresh);

module.exports = router;
