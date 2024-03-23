module.exports = (socket, onlineUsers) => {
  // Track if a user is online
  socket.on("userOnline", (username, callback) => {
    let isUserOnline = false;
    if (onlineUsers.some((u) => u.username === username)) {
      isUserOnline = true;
    }
    callback(isUserOnline);
  });
};
