import { getSocket, sendPrivateMessage } from "../../socket/socket";
import { useState, useEffect } from "react";
import MessageCard from "./messageCard";

function MessageCardList({ messages }) {
  const [allMessages, setAllMessages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Set all messages
    setAllMessages(messages);
  }, [messages]);

  useEffect(() => {
    // Get new messages
    const socket = getSocket();
    socket.on("receivePrivateMessage", (message, username) => {
      message.isNew = true;
      setAllMessages([message, ...allMessages]);
    });

    // set Messages as read
    socket.on("receiveIsRead", (_id) => {
      const updateOne = allMessages.map((message) => {
        if (message._id === _id) {
          message.isRead = true;
          message.isNew = false;
        }
        return message;
      });
      setAllMessages(updateOne);
    });
  }, [allMessages]);

  return (
    <div>
      {allMessages.map(
        ({ _id, sender, receiver, date, message, isRead, isNew }) => (
          <MessageCard
            key={_id}
            _id={_id}
            sender={sender.username}
            receiver={receiver.username}
            date={date}
            message={message}
            isRead={isRead}
            isNew={isNew}
          />
        )
      )}
    </div>
  );
}

export default MessageCardList;
