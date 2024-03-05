import { useEffect } from "react";
import io from "socket.io-client";

function Socket() {
  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("connect", () => {
      socket.emit("setUsername", localStorage.getItem("username"));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
}

export default Socket;
