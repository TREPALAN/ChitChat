import { useEffect, useState } from "react";
import UserCard from "./userCard";
import { getSocket } from "../../socket/socket";
import "../css/userCardList.css";

function UserCardList({ users }) {
  const [hasNewMessage, setHasNewMessage] = useState([]);
  useEffect(() => {
    const socket = getSocket();
    socket.on("receivePrivateMessage", (message, username) => {
      // get new messages
      console.log(message.message, username);
      const newMessage = { user: username, message: message };
      setHasNewMessage([...hasNewMessage, newMessage]);
    });
  }, [hasNewMessage]);

  return (
    <>
      {users &&
        users.map(
          ({
            _id,
            username,
            profilePicture,
            isFriend,
            isRequestSent,
            isRequestReceived,
          }) => (
            <UserCard
              id={_id}
              username={username}
              profilePicture={profilePicture}
              isFriend={isFriend}
              isRequestSent={isRequestSent}
              isRequestReceived={isRequestReceived}
              hasNewMessage={hasNewMessage.some((m) => m.user === username)}
            />
          )
        )}
    </>
  );
}

export default UserCardList;
