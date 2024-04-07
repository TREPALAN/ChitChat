import { useEffect, useState } from "react";
import { TrackOnlineUser } from "../socket/socket";

export default function useIsUserOnline(username) {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    // Track if a user is online
    async function checkOnline() {
      const result = await TrackOnlineUser(username);
      setIsOnline(result);
    }
    checkOnline();
    // Set an interval
    const interval = setInterval(checkOnline, 5000); // 5000 with the interval time in milliseconds

    return () => clearInterval(interval);
  });

  return isOnline;
}
