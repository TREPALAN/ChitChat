import { useEffect, useState, useReducer, useRef } from "react";
import { useParams } from "react-router-dom";
import MessageCardList from "../../cards/messageCardList";
import api from "../../../interceptors/axios";
import { sendPrivateMessage, getSocket } from "../../../socket/socket";
import MessagesReducer from "../../../reducers/PrivateMessagesReducer";
import useIsUserOnline from "../../../utils/isUserOnlineHook";
import onlineIcon from "../../../icons/online.svg";
import offlineIcon from "../../../icons/offline.svg";

function PrivateChat() {
  const paginatePerPage = 20;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useReducer(MessagesReducer, null);
  const page = useRef(0);
  const [loading, setLoading] = useState(true);
  const totalpages = useRef(null);
  const [error, setError] = useState("");
  const { username } = useParams();
  const online = useIsUserOnline(username);

  // Scroll to the bottom after messages are mapped
  if (page.current === 0) {
    window.scroll({
      top: document.body.scrollHeight,
      left: 0,
      behavior: "instant",
    });
  }

  // this effect is supposed to run only once
  useEffect(() => {
    // Load existing messages
    (async function loadMessages() {
      const result = await api.get("/chat/loadPrivateMessages/", {
        params: { username, currentPage: 0, paginatePerPage },
      });
      try {
        if (result.status === 200) {
          totalpages.current = result.data.totalpages;
          setLoading(false);
          setMessages({
            type: "setInitialMessages",
            messages: result.data.messages,
          });
        } else {
          console.log(result.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    })();

    // Listen for new messages
    const socket = getSocket();
    socket.on("receivePrivateMessage", (message, username) => {
      setMessages({ type: "messageReceived", messages: message });
    });

    socket.on("receiveIsRead", (_id) => {
      setMessages({ type: "setIsRead", id: _id });
    });
  }, [username]);

  async function loadOldMessages() {
    const nextPage = page.current + 1;
    page.current = nextPage;

    const result = await api.get("/chat/loadPrivateMessages/", {
      params: { username, currentPage: nextPage, paginatePerPage },
    });
    try {
      if (result.status === 200) {
        setMessages({ type: "loadOldMessage", messages: result.data.messages });
      } else {
        console.log(result.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function sendMessage(event) {
    event.preventDefault();
    if (!newMessage) {
      setError("Please enter a message");
      return;
    }

    const result = await sendPrivateMessage(username, newMessage);

    event.target.reset();
    setMessages({ type: "messageSent", messages: result.result });
    setNewMessage("");
  }

  return (
    <div>
      {online ? (
        <p>
          <img src={onlineIcon} alt="online" style={{ width: "10px" }} /> Online
        </p>
      ) : (
        <p>
          <img src={offlineIcon} alt="offline" style={{ width: "10px" }} />{" "}
          Offline
        </p>
      )}
      <h1>{username}</h1>
      {/* Display messages */}
      {loading && <p>Loading messages...</p>}
      {messages && (
        <>
          {totalpages.current > page.current ? (
            <small onClick={loadOldMessages} style={{ cursor: "pointer" }}>
              Load more
            </small>
          ) : (
            <small>No more messages </small>
          )}
          {messages.old && <MessageCardList messages={messages.old} />}

          {messages.messages && (
            <MessageCardList messages={messages.messages} />
          )}

          {messages.new && <MessageCardList messages={messages.new} />}
        </>
      )}

      {/* Send a message */}
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default PrivateChat;
