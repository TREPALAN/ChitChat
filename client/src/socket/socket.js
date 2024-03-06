import io from "socket.io-client";

export const socket = io("http://localhost:5000", {
  auth: {
    token: localStorage.getItem("token"),
  },
});

export function TrackOnlineUser(username) {
  return new Promise((resolve, reject) => {
    // Track if a user is online
    socket.emit("userOnline", username, (result) => {
      resolve(result);
    });
  });
}
