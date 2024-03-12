import { useEffect, useState } from "react";
import { TrackOnlineUser } from "../socket/socket";
import api from "../interceptors/axios";

function UserCard({ id, username, profilePicture, isFriend }) {
  const [online, setOnline] = useState(false);
  const [friend, setFriend] = useState(isFriend);
  const [isFetching, setIsFetching] = useState(false);
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

  // Add friend or remove friend

  async function addFriend() {
    if (isFetching) return;
    setIsFetching(true);
    const response = await api.post("home/addFriend", {
      username,
    });
    if (response.status === 200) {
      setFriend(!friend);
      setIsFetching(false);
    } else {
      alert(response.data.message);
    }
  }

  return (
    <div className="card" key={id}>
      {online ? (
        <div className="online">on</div>
      ) : (
        <div className="offline">off</div>
      )}
      <div className="card-body">
        <h5 className="card-title">{username}</h5>
        <p className="card-text">{profilePicture}</p>
        {friend ? (
          <button className="btn btn-danger" onClick={addFriend}>
            remove friend
          </button>
        ) : (
          <button className="btn btn-success" onClick={addFriend}>
            add friend
          </button>
        )}
      </div>
    </div>
  );
}

export default UserCard;
