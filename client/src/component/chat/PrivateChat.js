import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MessageCardList from "../cards/messageCardList";
import api from "../../interceptors/axios";
import { TrackOnlineUser, sendPrivateMessage } from "../../socket/socket";

function PrivateChat() {
  const [newMessage, setNewMessage] = useState("");
  const [online, setOnline] = useState(false);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const { username } = useParams();

  useEffect(() => {
    // Scroll to the bottom after messages are mapped
    window.scrollTo(0, document.body.scrollHeight);
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
      const result = await api.get("/chat/loadPrivateMessages/", {
        params: { username },
        page: 1,
      });
      try {
        if (result.status === 200) {
          setMessages(result.data.messages);
        } else {
          console.log(result.data.message);
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
    setMessages([MESSAGE, ...messages]);
    setNewMessage("");
  }

  return (
    <div>
      {online ? <p>Online</p> : <p>Offline</p>}
      <h1>Private Chat</h1>
      {/* Display messages */}
      {messages && <MessageCardList messages={messages} />}

      {/* Send a message */}
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
