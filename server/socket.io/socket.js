module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("setUsername", (username) => {
      socket.username = username;
      console.log(username + " connected");
    });

    socket.on("disconnect", () => {
      console.log(`${socket.username} disconnected`);
    });
  });
};
