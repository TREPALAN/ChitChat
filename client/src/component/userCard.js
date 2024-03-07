import { useEffect, useState } from "react";
import { TrackOnlineUser } from "../socket/socket";
function UserCard({ id, username, profilePicture }) {
  const [online, setOnline] = useState(false);

  useEffect(() => {
    // Track if a user is online
    async function checkOnline() {
      const result = await TrackOnlineUser(username);
      setOnline(result);
    }
    checkOnline();
    const interval = setInterval(checkOnline, 5000); // 5000 with the interval time in milliseconds

    return () => {
      clearInterval(interval); // Clean up the interval when the component is unmounted
    };
  }, [username]);

  return (
    <div className="card">
      {online ? (
        <div className="online">on</div>
      ) : (
        <div className="offline">off</div>
      )}
      <div className="card-body">
        <h5 className="card-title">{username}</h5>
        <p className="card-text">{profilePicture}</p>
      </div>
    </div>
  );
}

export default UserCard;
