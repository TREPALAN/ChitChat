import io, { Socket } from "socket.io-client";

let socket;

export function socketConnect(token) {
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

export default socket;
