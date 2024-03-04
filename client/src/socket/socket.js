import { useEffect } from "react";
import io from "socket.io-client";

function Socket() {
  useEffect(() => {
    const socket = io("http://localhost:5000"); // Replace with your backend server URL
    socket.on("connect", () => {
      console.log("Connected to socket.io server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
}

export default Socket;
