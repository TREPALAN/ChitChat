import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MessageCard from "../cards/messageCard";
import {
  getSocket,
  TrackOnlineUser,
  loadPrivateMessages,
  sendPrivateMessage,
} from "../../socket/socket";

function PrivateChat() {
  const [online, setOnline] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const { username } = useParams();

  useEffect(() => {
    // Get new messages
    const socket = getSocket();
    socket.on("receivePrivateMessage", (message, username) => {
      message.isNew = true;
      setMessages([...messages, message]);
    });

    // set Messages as read
    socket.on("receiveIsRead", (_id) => {
      const updateOne = messages.map((message) => {
        if (message._id === _id) {
          message.isRead = true;
          message.isNew = false;
        }
        return message;
      });
      setMessages(updateOne);
    });
  }, [messages]);

  useEffect(() => {
    // Track if a user is online
    async function checkOnline() {
      const result = await TrackOnlineUser(username);
      setOnline(result);
    }
    checkOnline();
    // Set an interval
    const interval = setInterval(checkOnline, 5000); // 5000 with the interval time in milliseconds

    // Load messages
    async function loadMessages() {
      const result = await loadPrivateMessages(username);
      try {
        if (result.message === "Socket disconnected") {
          // Handle socket disconnected
        } else {
          setMessages(result);
        }
      } catch (error) {
        console.log(error);
      }
    }
    loadMessages();

    return () => {
      clearInterval(interval); // Clean up the interval when the component is unmounted
    };
  }, [username]);

  async function sendMessage(event) {
    event.preventDefault();
    if (!newMessage) {
      setError("Please enter a message");
      return;
    }

    const result = await sendPrivateMessage(username, newMessage);

    event.target.reset();
    const MESSAGE = result.result;
    setMessages([...messages, MESSAGE]);
    setNewMessage("");
  }

  return (
    <div>
      {online ? <p>Online</p> : <p>Offline</p>}
      <h1>Private Chat</h1>
      {messages &&
        messages.map((message) => (
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
        ))}
      <form onSubmit={sendMessage}>
        <input
          type="text"
          id="messageInput"
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default PrivateChat;
