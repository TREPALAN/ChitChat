import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TrackOnlineUser } from "../socket/socket";
import api from "../interceptors/axios";

function PrivateChat() {
  const [online, setOnline] = useState(false);
  const [messages, setMessages] = useState("");
  const { username } = useParams();

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

    // Load messages
    async function loadMessages() {
      const response = await api.post("message/loadMessages", {
        username,
      });
      if (response.status === 200) {
        setMessages(response.data);
      }
    }
  }, [username]);

  function sendMessage(event) {
    event.preventDefault();
    setMessage("");
  }

  return (
    <div>
      {online && <p>Online</p>}
      <h1>Private Chat</h1>
    </div>
  );
}

export default PrivateChat;
