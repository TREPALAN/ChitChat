const jwt = require("jsonwebtoken");
require("dotenv").config();
const sendPrivateMessage = require("./utilities/sendPrivateMessage");
const sendGroupMessage = require("./utilities/sendGroupMessage");
const markAsRead = require("./utilities/markAsRead");

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
    } catch (error) {
      // If token is invalid
      console.log("invalid token");
      socket.emit("invalidToken");
      socket.disconnect();
    }
    console.log("a user connected", user.username);

    socket.on("sendPrivateMessage", async (receiver, message, callback) => {
      try {
        result = await sendPrivateMessage(
          socket,
          user.username,
          receiver,
          onlineUsers,
          message
        );
        callback({ result });
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("markAsRead", async (_id, sender) => {
      try {
        await markAsRead(socket, _id, sender, onlineUsers);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("userOnline", (username, callback) => {
      let isUserOnline = false;
      if (onlineUsers.some((u) => u.username === username)) {
        isUserOnline = true;
      }
      callback(isUserOnline);
    });

    socket.on("joinRoom", (room) => {
      // Join a Group room
      socket.join(room);
    });

    socket.on("sendGroupMessage", async (group, message, callback) => {
      try {
        result = await sendGroupMessage(socket, user.username, group, message);
        callback({ result });
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("leaveRoom", (room) => {
      // Leave a Group room
      socket.leave(room);
    });

    // On disconnection
    socket.on("disconnect", () => {
      console.log("user disconnected", user.username);
      onlineUsers = onlineUsers.filter((u) => u.id !== socket.id);
    });
  });
};
