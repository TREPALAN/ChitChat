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
      {allMessages
        .map((message) => (
          <MessageCard
            key={message._id}
            _id={message._id}
            sender={message.sender.username}
            receiver={message.receiver.username}
            date={message.date}
            message={message.message}
            isRead={message.isRead}
            isNew={message.isNew}
          />
        ))
        .reverse()}
    </div>
  );
}

export default MessageCardList;
