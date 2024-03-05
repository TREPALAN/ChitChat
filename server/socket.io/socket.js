let onlineUsers = [];
module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("setUsername", (username) => {
      socket.username = username;
      onlineUsers.push({ username: socket.username, id: socket.id });
      console.log(username + " connected");
    });

    socket.on("disconnect", () => {
      onlineUsers = onlineUsers.filter(
        (user) => user.username != socket.username
      );
      console.log(socket.username + " disconnected");
    });
  });
};

module.exports.onlineUsers = onlineUsers;
