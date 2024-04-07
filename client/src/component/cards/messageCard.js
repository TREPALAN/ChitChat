import { useEffect } from "react";
import { getSocket } from "../../socket/socket";
function MessageCard({ _id, sender, receiver, date, message, isRead, isNew }) {
  const requestUser = localStorage.getItem("username");

  function setAsRead() {
    const socket = getSocket();
    console.log("set as read");
    socket.emit("markAsRead", _id, sender);
  }
  if (!isRead && requestUser === receiver) {
    setAsRead();
  }

  return (
    <>
      {requestUser === receiver ? (
        // If the user is the receiver
        <div className="messageCard">
          <div>
            <p>{isNew && "new"}</p>
            <p>{isRead}</p>
          </div>
          <p>{message}</p>
        </div>
      ) : (
        // If the user is the sender
        <div className="messageCard">
          {isRead && <p>visualized</p>}
          <p>{message}</p>
        </div>
      )}
    </>
  );
}

export default MessageCard;
