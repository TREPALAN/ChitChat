const auth = require("../startup/auth/auth");
const registerRoute = require("../routes/register");
const loginRoute = require("../routes/login");
const indexRoute = require("../routes/index");
const refreshRoute = require("../routes/refresh");
const searchFriendRoute = require("../routes/searchFriend");
const allFriendsRoute = require("../routes/allFriends");
// Routes
module.exports = (app) => {
  app.use("/home", auth, indexRoute);
  app.use("/searchFriend", auth, searchFriendRoute);
  app.use("/allFriends", auth, allFriendsRoute);

  // Authentication
  app.post("/register", registerRoute);
  app.post("/login", loginRoute);
  app.post("/refresh", refreshRoute);
};
