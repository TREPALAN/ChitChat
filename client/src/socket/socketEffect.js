import { useEffect } from "react";
import { socket } from "./socket";

function Effect() {
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  });

  return null;
}

export default Effect;
