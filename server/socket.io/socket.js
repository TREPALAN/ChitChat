const jwt = require("jsonwebtoken");
require("dotenv").config();
// Track online users
let onlineUsers = [];
module.exports = (io) => {
  // On connection
  io.on("connection", (socket) => {
    const token = socket.handshake.auth.token;
    let user = "";
    try {
      // Get the user username from the token
      user = jwt.verify(token, process.env.JWT_SECRET);
      onlineUsers.push({ username: user.username, id: socket.id });
      console.log("online users", onlineUsers);
    } catch (error) {
      // If token is invalid
      console.log(error);
      socket.disconnect();
    }
    console.log("new user connected", user.username);

    // Track if a user is online
    socket.on("userOnline", (username, callback) => {
      let isUserOnline = false;
      if (onlineUsers.some((u) => u.username === username)) {
        isUserOnline = true;
      }
      callback(isUserOnline);
    });

    // On disconnection
    socket.on("disconnect", () => {
      console.log("user disconnected", user.username);
      onlineUsers = onlineUsers.filter((u) => u.id !== socket.id);
      console.log("online users", onlineUsers);
    });
  });
};

module.exports.onlineUsers = onlineUsers;
