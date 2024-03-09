const auth = require("../startup/auth/auth");
const registerRoute = require("../routes/register");
const loginRoute = require("../routes/login");
const indexRoute = require("../routes/index");
const refreshRoute = require("../routes/refresh");
const searchFriendRoute = require("../routes/searchFriend");
const allFriendsRoute = require("../routes/allFriends");

// validation and sanitization
const { query, body, validationResult } = require("express-validator");
// Routes
module.exports = (app) => {
  app.use("/home", auth, indexRoute);

  app.use(
    "/searchFriend",
    auth,
    query("username").isString().notEmpty().escape(),
    (req, res, next) => {
      const result = validationResult(req);
      if (result.isEmpty()) {
        return next();
      }

      return res.status(400).json({
        message:
          "Validation error: username field is required and must be a non-empty string",
      });
    },
    searchFriendRoute
  );

  app.use("/allFriends", auth, allFriendsRoute);

  // Authentication
  app.post("/register", registerRoute);
  app.post("/login", loginRoute);
  app.post("/refresh", refreshRoute);
};
