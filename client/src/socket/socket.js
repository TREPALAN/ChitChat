import io from "socket.io-client";

let socket;

export function socketConnect(token) {
  const socket = io("http://localhost:5000", {
    auth: {
      token,
    },
  });

  return socket;
}

export function TrackOnlineUser(username) {
  return new Promise((resolve, reject) => {
    // Track if a user is online
    socket.emit("userOnline", username, (result) => {
      resolve(result);
    });
  });
}
