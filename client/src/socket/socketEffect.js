import { useEffect } from "react";
import { socketConnect } from "../socket/socket";
import getRefreshToken from "../utils/getRefreshToken";
import logout from "../utils/logoutFunction";

function Effect() {
  const token = localStorage.getItem("token");
  useEffect(() => {
    const socket = socketConnect(token);

    // Handle expired token
    socket.on("invalidToken", () => {
      // Handle expired token
      try {
        getRefreshToken();
      } catch (error) {
        window.alert("Something went wrong");
        logout();
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  return null;
}

export default Effect;
