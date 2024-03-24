import { useEffect, useState } from "react";
import { getSocket } from "../socket/socket";
function MessageCard({ _id, sender, receiver, date, message, isRead, isNew }) {
  const requestUser = localStorage.getItem("username");
  const [seeing, setSeeing] = useState(isRead);
  useEffect(() => {
    const socket = getSocket();
    socket.on(_id + "isRead", () => {
      setSeeing(true);
    });
  }, [seeing, _id]);

  function MarkAsRead() {
    const socket = getSocket();
    socket.emit("markAsRead", _id, receiver);
    return;
  }
  return (
    <>
      {requestUser === receiver ? (
        // If the user is the receiver
        <div className="messageCard" onScroll={!isRead && MarkAsRead()}>
          <div>
            <p>{isNew && "new"}</p>
            <p>{isRead}</p>
          </div>
          <p>{message}</p>
        </div>
      ) : (
        // If the user is the sender
        <div className="messageCard">
          {seeing && <p>visualized</p>}
          <p>{message}</p>
        </div>
      )}
    </>
  );
}

export default MessageCard;
