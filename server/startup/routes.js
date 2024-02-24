const auth = require("../startup/auth/auth");
const registerRoute = require("../routes/register");
const loginRoute = require("../routes/login");
const indexRoute = require("../routes/index");
const refreshRoute = require("../routes/refresh");
// Routes
module.exports = (app) => {
  app.use("/home", auth, indexRoute);

  // Authentication
  app.post("/register", registerRoute);
  app.post("/login", loginRoute);
  app.post("/refresh", refreshRoute);
};
