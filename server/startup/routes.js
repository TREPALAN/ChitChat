const auth = require("../startup/auth/auth");
const indexRoute = require("../routes/index");
const authRoute = require("../routes/authorization");
const requestRoute = require("../routes/friendRequest");
const chatRoute = require("../routes/chat");
// Routes
module.exports = (app) => {
  app.use("/auth", authRoute);
  app.use("/home", auth, indexRoute);
  app.use("/chat", auth, chatRoute);
  app.use("/request", auth, requestRoute);
};
