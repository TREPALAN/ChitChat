import io from "socket.io-client";

let socket;

export function socketConnect(token) {
  // Connect to socket
  const url = io("http://localhost:5000", {
    auth: {
      token,
    },
  });
  socket = url;
  return url;
}

export function TrackOnlineUser(username) {
  return new Promise((resolve, reject) => {
    // Track if a user is online
    socket.emit("userOnline", username, (result) => {
      resolve(result);
    });
  });
}

export function sendGroupMessage(group, message) {
  return new Promise((resolve, reject) => {
    // Send group message
    socket.emit("sendGroupMessage", group, message, (result) => {
      resolve(result);
    });
  });
}

export function sendPrivateMessage(receiver, message) {
  return new Promise((resolve, reject) => {
    // Send private message
    socket.emit("sendPrivateMessage", receiver, message, (result) => {
      resolve(result);
    });
  });
}

export function getSocket() {
  return socket;
}
