import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  TrackOnlineUser,
  loadPrivateMessages,
  sendPrivateMessage,
} from "../socket/socket";

function PrivateChat() {
  const [online, setOnline] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { username } = useParams();

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
    const result = await sendPrivateMessage(username, newMessage);

    event.target.reset();
    const MESSAGE = result.result;
    setMessages([...messages, MESSAGE]);
    setNewMessage("");
  }

  return (
    <div>
      {online && <p>Online</p>}
      <h1>Private Chat</h1>
      {messages &&
        messages.map(({ _id, sender, receiver, date, message }) => {
          return (
            <div key={_id}>
              <p>{date}</p>
              <p>{message}</p>
            </div>
          );
        })}
      <form onSubmit={sendMessage}>
        <input
          type="text"
          id="messageInput"
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default PrivateChat;
