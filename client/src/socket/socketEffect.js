import { useEffect } from "react";
import { socketConnect } from "../socket/socket";

function Effect() {
  const token = localStorage.getItem("token");
  useEffect(() => {
    const socket = socketConnect(token);
    return () => {
      socket.disconnect();
    };
  }, [token]);

  return null;
}

export default Effect;
