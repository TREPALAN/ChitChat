const PrivateMessage = require("../../models/privateMessage");

function markAsRead(socket, _id, sender, onlineUsers) {
  // Mark as read
  socket.on("markAsRead", async () => {
    try {
      const result = await PrivateMessage.updateOne(
        { _id },
        { $set: { isRead: true } }
      );

      // Send private message to  all of the sender secions
      if (onlineUsers.some((u) => u.username === sender)) {
        const senderSockets = onlineUsers.filter((u) => u.username === sender);
        console.log("senderSockets", senderSockets);
        senderSockets.forEach((senderSocket) => {
          socket.to(senderSocket.id).emit("receiveIsRead", _id);
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

module.exports = markAsRead;
