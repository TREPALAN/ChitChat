import { useEffect } from "react";
import io from "socket.io-client";

function Socket() {
  useEffect(() => {
    const socket = io("http://localhost:5000", {
      auth: {
        token: localStorage.getItem("token"),
      },
    });
    socket.on("connect", () => {
      console.log("connected to socket");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
}

export default Socket;
