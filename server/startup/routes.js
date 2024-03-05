const auth = require("../startup/auth/auth");
const registerRoute = require("../routes/register");
const loginRoute = require("../routes/login");
const indexRoute = require("../routes/index");
const refreshRoute = require("../routes/refresh");
const searchFriendRoute = require("../routes/searchFriend");
// Routes
module.exports = (app) => {
  app.use("/home", auth, indexRoute);
  app.post("/searchFriend", searchFriendRoute);

  // Authentication
  app.post("/register", registerRoute);
  app.post("/login", loginRoute);
  app.post("/refresh", refreshRoute);
};
