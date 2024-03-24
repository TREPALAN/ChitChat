const PrivateMessage = require("../../models/privateMessage");

function markAsRead(socket, _id, receiver, onlineUsers) {
  // Mark as read
  socket.on("markAsRead", async () => {
    try {
      const result = await PrivateMessage.updateOne(
        { _id },
        { $set: { isRead: true } }
      );

      // Send private message to  all of the receiver secions
      if (onlineUsers.some((u) => u.username === receiver)) {
        const receiverSockets = onlineUsers.filter(
          (u) => u.username === receiver
        );
        receiverSockets.forEach((receiverSocket) => {
          socket.to(receiverSocket.id).emit(_id + "isRead");
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

module.exports = markAsRead;
