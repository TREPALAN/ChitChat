const auth = require("../startup/auth/auth");
const indexRoute = require("../routes/index");
const authRoute = require("../routes/authorization");
const requestRoute = require("../routes/friendRequest");
const messageRoute = require("../routes/message");
// Routes
module.exports = (app) => {
  app.use("/auth", authRoute);
  app.use("/home", auth, indexRoute);
  app.use("/request", auth, requestRoute);
  app.use("/message", auth, messageRoute);
};
