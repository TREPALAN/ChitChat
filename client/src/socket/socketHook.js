import { useEffect, useState } from "react";
import getRefreshToken from "../utils/getRefreshToken";
import logout from "../utils/logoutFunction";
import { socketConnect } from "./socket";

function SocketHook() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const socket = socketConnect(token);

    // Handle expired token
    socket.on("invalidToken", () => {
      // Handle expired token
      try {
        async function refreshToken() {
          await getRefreshToken();
          setToken(localStorage.getItem("token"));
        }
        refreshToken();
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

export default SocketHook;
