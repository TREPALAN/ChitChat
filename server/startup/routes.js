const auth = require("../startup/auth/auth");
const indexRoute = require("../routes/index");
const authRoute = require("../routes/authorization");
const requestRoute = require("../routes/friendRequest");
// Routes
module.exports = (app) => {
  app.use("/home", auth, indexRoute);
  app.use("/auth", authRoute);
  app.use("/request", auth, requestRoute);
};
