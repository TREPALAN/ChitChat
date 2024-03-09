const auth = require("../startup/auth/auth");
const indexRoute = require("../routes/index");
const authRoute = require("../routes/authorization");
// Routes
module.exports = (app) => {
  app.use("/home", auth, indexRoute);
  app.use("/auth", authRoute);
};
