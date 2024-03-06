const jwt = require("jsonwebtoken");
require("dotenv").config();

let onlineUsers = [];
module.exports = (io) => {
  io.on("connection", (socket) => {
    const token = socket.handshake.auth.token;
    let user = "";
    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
      onlineUsers.push({ username: user.username, id: socket.id });
      console.log("online users", onlineUsers);
    } catch (error) {
      console.log("error while verifying token", error);
    }
    console.log("new user connected", user.username);

    socket.on("disconnect", () => {
      console.log("user disconnected", user.username);
      onlineUsers = onlineUsers.filter((u) => u.id !== socket.id);
      console.log("online users", onlineUsers);
    });
  });
};

module.exports.onlineUsers = onlineUsers;
